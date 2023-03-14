import runPgQuery from "./run-pg-query";

const linkTokenToUserMod = async (
  userToken: string,
  userModId: number
): Promise<boolean> => {
  let tokenHasBeenLinked = false;
  try {
    // store token association with user in database
    await runPgQuery(
      `UPDATE pending_user_modifications 
           SET token_id = (SELECT id FROM tokens WHERE token = $1) 
           WHERE id = $2 RETURNING *`,
      [userToken, userModId.toString()]
    );
    tokenHasBeenLinked = true;
  } catch (error) {
    console.error(error);
  }
  return tokenHasBeenLinked;
};

export default linkTokenToUserMod;
