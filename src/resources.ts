import { SocialHandleType } from "./types";

export interface AuthTokenResource {
  expired?: boolean;
  token: string;
  type: string;
}

export interface BlogPostResource {
  contents: string;
  date: string;
  slug: string;
  title: string;
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
