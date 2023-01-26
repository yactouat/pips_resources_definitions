import { BuildResourceStateType, SocialHandleType } from "./types";

export interface AuthTokenResource {
  token: string;
}

export interface BlogPostResource {
  contents: string;
  date: string;
  slug: string;
  title: string;
}

export interface BuildResource {
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

export interface ImageResource {
  alt: string;
  b64: string;
  caption: string;
  name: string;
  public: boolean;
}

export interface UserResource {
  email: string;
  socialHandle: string;
  socialHandleType: SocialHandleType;
  password: string | null;
  verified: boolean;
}
