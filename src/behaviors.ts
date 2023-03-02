import { Client } from "pg";
import crypto from "crypto";
import { Response } from "express";
import fs from "fs";
import jwtDecode from "jwt-decode";

import { MigrationType, PgClientConfigType, TokenType } from "./types";
import { TokenResource, UserResource } from "./resources";

export const comesFromLegitPubSub = (
  req: {
    headers: {
      authorization?: string;
    };
    body: {
      message: {
        data: string;
      };
    };
  },
  expectedPubSubTokenAud: string,
  expectedPubSubTokenEmail: string
): boolean => {
  // pessimistc assumption
  let comesFromLegitPubSub = false;
  // get the Cloud Pub/Sub-generated JWT in the "Authorization" header.
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.substring(7);
  // decode the JWT
  const decodedToken = jwtDecode(token);
  // verifying the claims
  comesFromLegitPubSub =
    (
      decodedToken as {
        aud: string;
      }
    ).aud === expectedPubSubTokenAud &&
    (
      decodedToken as {
        email: string;
      }
    ).email === expectedPubSubTokenEmail;
  return comesFromLegitPubSub;
};

export const decodePubSubMessage = (req: {
  body: {
    message: {
      data: string;
    };
  };
}): unknown => {
  const message = JSON.parse(
    Buffer.from(req.body.message.data, "base64").toString("utf-8")
  );
  return message;
};

export const generateToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const getPgClient = (): Client => {
  // loading .env file only in development
  if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
  }
  let pgClientConfig: PgClientConfigType = {
    database: process.env.PGDATABASE as string,
    host: process.env.PGHOST as string,
    user: process.env.PGUSER as string,
  };
  if (process.env.NODE_ENV !== "development") {
    pgClientConfig = {
      database: process.env.PGDATABASE as string,
      host: process.env.PGHOST as string,
      // this object will be passed to the TLSSocket constructor
      ssl: {
        ca: fs
          .readFileSync(
            process.env.SUPABASE_POSTGRES_ROOT_CERT_FILE_NAME as string
          )
          .toString(),
      },
    };
  }
  return new Client(pgClientConfig);
};

export const getUserFromDbWithEmail = async (
  email: string,
  pgClient: Client,
  hideUserPassword = true
): Promise<UserResource | null> => {
  await pgClient.connect();
  const userSelectQuery = await pgClient.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  let user: UserResource | null = null;
  if (userSelectQuery.rowCount > 0) {
    user = userSelectQuery.rows[0] as UserResource;
    user.password = hideUserPassword ? null : user.password;
  }
  await pgClient.end();
  return user;
};

export const getUserFromDbWithId = async (
  id: number,
  pgClient: Client
): Promise<UserResource | null> => {
  await pgClient.connect();
  const userSelectQuery = await pgClient.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  let user: UserResource | null = null;
  if (userSelectQuery.rowCount > 0) {
    user = userSelectQuery.rows[0] as UserResource;
    user.password = null;
  }
  await pgClient.end();
  return user;
};

export const linkTokenToUserMod = async (
  userToken: string,
  userModId: number
): Promise<boolean> => {
  let tokenHasBeenLinked = false;
  const tokenAssociationQueryClient = getPgClient();
  try {
    // store token association with user in database
    await tokenAssociationQueryClient.connect();
    await tokenAssociationQueryClient.query(
      `UPDATE pending_user_modifications 
       SET token_id = (SELECT id FROM tokens WHERE token = $1) 
       WHERE id = $2 RETURNING *`,
      [userToken, userModId]
    );
    await tokenAssociationQueryClient.end();
    tokenHasBeenLinked = true;
  } catch (error) {
    console.error(error);
  }
  return tokenHasBeenLinked;
};

export const migrateDb = async () => {
  // scan `migrations` folder
  const sqlScripts = fs.readdirSync("sql");
  const pgClient = getPgClient();
  pgClient.connect();
  // run each migration in ascending order
  for (let i = 0; i < fs.readdirSync("sql").length; i++) {
    if (sqlScripts[i].endsWith(".sql")) {
      await new MigrationType(sqlScripts[i], pgClient).up();
    }
  }
  pgClient.end();
};

export const parseUserId = (userId: string | number | null): number | null => {
  if (/^\d+$/.test(userId as string)) {
    return parseInt(userId as string);
  }
  return null;
};

export const saveUserToken = async (
  userEmail: string,
  tokenType: TokenType
): Promise<string> => {
  let createdToken = "";
  // we need two connections here: one for the token and one for the association, that uses the returned token id
  const tokenInsertionQueryClient = getPgClient();
  const tokenAssociationQueryClient = getPgClient();
  // creating a token
  const newToken: TokenResource = {
    type: tokenType,
    token: generateToken(),
  };
  try {
    // get user linked to email
    const user = await getUserFromDbWithEmail(userEmail, getPgClient());
    if (user != null) {
      // store token in database
      await tokenInsertionQueryClient.connect();
      const insertToken = await tokenInsertionQueryClient.query(
        "INSERT INTO tokens(token) VALUES ($1) RETURNING *",
        [newToken.token]
      );
      await tokenInsertionQueryClient.end();
      const token = insertToken.rows[0] as TokenResource;
      // store token association with user in database
      await tokenAssociationQueryClient.connect();
      await tokenAssociationQueryClient.query(
        "INSERT INTO tokens_users(token_id, user_id, type) VALUES ($1, $2, $3) RETURNING *",
        [token.id, user.id, newToken.type.toLowerCase()]
      );
      await tokenAssociationQueryClient.end();
      createdToken = newToken.token;
    }
  } catch (error) {
    console.error(error);
  }
  return createdToken;
};

export const sendJsonResponse = (
  res: Response,
  status: number,
  msg: string,
  data: {}[] | {} | null = null
) => {
  res.status(status).json({
    msg,
    data,
  });
};
