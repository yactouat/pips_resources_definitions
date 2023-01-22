export type APIAccessLevelType = "SELF" | "MODERATOR" | "ADMIN";

export type APIAccessScopeType = {
  level: APIAccessLevelType;
  resource: CRUDResourceType;
};

export type APIResponseType = {
  msg: string;
  data: {}[] | {} | null;
};

export type BuildResourceStateType = "ERROR" | "READY" | "MASKED";

export type CRUDResourceType =
  | "APIKey"
  | "AuthToken"
  | "BlogPost"
  | "Build"
  | "Image"
  | "User";

export type SocialHandleType = "GitHub" | "LinkedIn";
