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

export interface PgClientConfigType {
  database: string;
  host: string;
  ssl?: {
    ca: string;
  };
  user?: string;
}

export type SocialHandleType = "GitHub" | "LinkedIn";

export interface VercelDeploymentType {
  aliasAssigned: number | null;
  aliasError: string | null;
  buildingAt: number | null;
  created: number | null;
  createdAt: number | null;
  creator: {
    email: string;
    githubLogin: string;
    uid: string;
    username: string;
  } | null;
  inspectorUrl: string;
  isRollbackCandidate: boolean | null;
  meta: {
    githubCommitAuthorLogin: string;
    githubCommitAuthorName: string;
    githubCommitMessage: string;
    githubCommitOrg: string;
    githubCommitRef: string;
    githubCommitRepo: string;
    githubCommitRepoId: string;
    githubCommitSha: string;
    githubDeployment: string;
    githubOrg: string;
    githubRepo: string;
    githubRepoId: string;
    githubRepoOwnerType: string;
  };
  name: string;
  ready: number;
  state: BuildResourceStateType;
  type: string;
  uid: string;
  url: string;
}
