export type APIResponseType = {
  msg: string;
  data: {}[] | {} | null;
};

export type BuildResourceStateType = "ERROR" | "READY" | "MASKED";

export type CRUDResourceType =
  | "AuthToken"
  | "BlogPost"
  | "Build"
  | "Image"
  | "User";

export type SocialHandleType = "GitHub" | "LinkedIn";
