import { UserResource } from "../../resources";
import runPgQuery from "./run-pg-query";

const getUserFromDbWithEmail = async (
  email: string,
  hideUserPassword = true
): Promise<UserResource | null> => {
  const userSelectQuery = await runPgQuery(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  let user: UserResource | null = null;
  if (userSelectQuery.rowCount > 0) {
    user = userSelectQuery.rows[0] as UserResource;
    user.password = hideUserPassword ? null : user.password;
  }
  return user;
};

export default getUserFromDbWithEmail;
