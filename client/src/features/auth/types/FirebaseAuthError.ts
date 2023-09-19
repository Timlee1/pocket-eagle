export type FireBaseAuthError = {
  code: string;
  message: string;
  errors: unknown;
};

export const isFirebaseAuthError = (error: unknown) => {
  try {
    if (typeof error === "object" && error !== null) {
      if ("code" in error && "message" in error) {
        if (
          typeof error.code === "string" &&
          typeof error.message === "string"
        ) {
          return true;
        }
      }
      return false;
    }
  } catch {
    return false;
  }
};
