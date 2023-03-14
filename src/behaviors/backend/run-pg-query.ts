import getPgClient from "./get-pg-client";

const runPgQuery = async (sqlQuery: string, params: string[] = []) => {
  const pgClient = getPgClient();
  await pgClient.connect();
  const query = await pgClient.query(sqlQuery, params);
  await pgClient.end();
  return query;
};

export default runPgQuery;
