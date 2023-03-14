import jwtDecode from "jwt-decode";

const comesFromLegitPubsub = (
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

export default comesFromLegitPubsub;
