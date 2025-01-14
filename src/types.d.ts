import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      emails: { value: string }[];
    }
  }
}
