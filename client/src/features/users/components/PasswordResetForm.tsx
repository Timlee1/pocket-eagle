import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
// import {
//   FireBaseAuthError,
//   isFirebaseAuthError,
// } from "../types/FirebaseAuthError";

export const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email was sent");
    } catch (error) {
      // if (isFirebaseAuthError(error)) {
      //   const firebaseError = error as FireBaseAuthError;
      //   const errorCode = firebaseError.code;
      //   const errorMessage = firebaseError.message;
      //   console.log(errorCode);
      //   console.log(errorMessage);
      // }
      setMessage("Unable to send password reset email");
    }
  };
  return (
    <>
      <label htmlFor="email">Email:</label>
      <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
      <button onClick={handlePasswordReset}>Email Reset Password Link</button>
      {message && <p>{message}</p>}
    </>
  );
};
