import { SocialHandleType, TokenType } from "./types";

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

export interface TokenResource {
  id?: number;
  expired?: boolean;
  token: string;
  type: TokenType;
}

export interface UserResource {
  id?: number;
  email: string;
  socialHandle: string;
  socialHandleType: SocialHandleType;
  password: string | null;
  verified: boolean;
}
