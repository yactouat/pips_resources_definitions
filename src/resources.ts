import {
  PendingUserModificationType,
  SocialHandleType,
  TokenType,
} from "./types";

/**
 * these shared DTOs are meant to be used by backends and frontends of the PIPS system
 */

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

export interface PendingUserModificationResource {
  committed_at?: string;
  created_at: string;
  id: number;
  field: PendingUserModificationType;
  value: string;
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
  hasPendingModifications?: boolean;
  socialHandle: string;
  socialHandleType: SocialHandleType;
  password: string | null;
  verified: boolean;
}
