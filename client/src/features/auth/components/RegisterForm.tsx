import { useState } from "react";
import { auth, googleProvider } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { LogOutButton } from "./LogOutButton";
import {
  FireBaseAuthError,
  isFirebaseAuthError,
} from "../types/FirebaseAuthError";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser != null) {
        await sendEmailVerification(auth.currentUser);
      }
    } catch (error) {
      if (isFirebaseAuthError(error)) {
        const firebaseError = error as FireBaseAuthError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        console.log(errorCode);
        console.log(errorMessage);
      }
    }
  };
  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (isFirebaseAuthError(error)) {
        const firebaseError = error as FireBaseAuthError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        console.log(errorCode);
        console.log(errorMessage);
      }
    }
  };

  return (
    <>
      <label htmlFor="email">Email:</label>
      <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleEmailRegister}>Submit</button>
      <button onClick={handleGoogleRegister}>Sign In With Google</button>
      <LogOutButton />
    </>
  );
};
