import crypto from "crypto";

const generateToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export default generateToken;
