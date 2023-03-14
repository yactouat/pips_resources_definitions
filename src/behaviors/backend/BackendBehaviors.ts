import comesFromLegitPubsub from "./comes-from-legit-pubsub";
import decodePubsubMessage from "./decode-pubsub-message";
import generateToken from "./generate-token";
import getPgClient from "./get-pg-client";
import getUserFromDbWithEmail from "./get-user-from-db-with-email";
import getUserFromDbWithId from "./get-user-from-db-with-id";
import linkTokenToUserMod from "./link-token-to-user-mod";
import migrateDb from "./migrate-db";
import runPgQuery from "./run-pg-query";
import saveUserToken from "./save-user-token";
import sendJsonResponse from "./send-json-response";

const BackendBehaviors = {
  comesFromLegitPubsub: comesFromLegitPubsub,
  decodePubsubMessage: decodePubsubMessage,
  generateToken: generateToken,
  getPgClient: getPgClient,
  getUserFromDbWithEmail: getUserFromDbWithEmail,
  getUserFromDbWithId: getUserFromDbWithId,
  linkTokenToUserMod: linkTokenToUserMod,
  migrateDb: migrateDb,
  runPgQuery: runPgQuery,
  saveUserToken: saveUserToken,
  sendJsonResponse: sendJsonResponse,
};

export default BackendBehaviors;
