export type User =
  | {
      email: string;
      authProvider: "password" | "google.com";
    }
  | undefined;
