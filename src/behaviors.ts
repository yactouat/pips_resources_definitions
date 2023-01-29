import jwtDecode from "jwt-decode";

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
