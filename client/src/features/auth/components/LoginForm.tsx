import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { LogOutButton } from "./LogOutButton";
import { Users } from "@/features/users";
import {
  FireBaseAuthError,
  isFirebaseAuthError,
} from "../types/FirebaseAuthError";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    } catch (error) {
      if (isFirebaseAuthError(error)) {
        const firebaseError = error as FireBaseAuthError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        //const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
      }
    }
  };

  return (
    <>
      <label htmlFor="email">Email</label>
      <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleEmailLogin}>Submit</button>
      <button onClick={handleGoogleLogin}>Sign In With Google</button>
      <LogOutButton />
      <Users />
    </>
  );
};
