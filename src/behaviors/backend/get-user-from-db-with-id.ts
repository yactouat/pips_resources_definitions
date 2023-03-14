import { UserResource } from "../../resources";
import runPgQuery from "./run-pg-query";

const getUserFromDbWithId = async (
  id: number
): Promise<UserResource | null> => {
  const userSelectQuery = await runPgQuery(
    `SELECT * FROM users WHERE id = $1`,
    [id.toString()]
  );
  let user: UserResource | null = null;
  if (userSelectQuery.rowCount > 0) {
    user = userSelectQuery.rows[0] as UserResource;
    user.password = null;
  }
  return user;
};

export default getUserFromDbWithId;
