import { Client } from "pg";
import { Response } from "express";
import fs from "fs";
import jwtDecode from "jwt-decode";

import { MigrationType, PgClientConfigType } from "./types";
import { UserResource } from "./resources";

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

export const getUserFromDb = async (
  email: string,
  pgClient: Client
): Promise<UserResource> => {
  await pgClient.connect();
  const userSelectQuery = await pgClient.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  const user = userSelectQuery.rows[0] as UserResource;
  await pgClient.end();
  return user;
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
