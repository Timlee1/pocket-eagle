import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { LogOutButton } from "./LogOutButton";
// import { Users } from "@/features/users";
// import {
//   FireBaseAuthError,
//   isFirebaseAuthError,
// } from "../types/FirebaseAuthError";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [verifyEmail, setVerifyEmail] = useState<boolean>();
  const [user, setUser] = useState<User>();

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      if (!result.user.emailVerified) {
        setVerifyEmail(true);
      } else {
        setVerifyEmail(false);
        setMessage("Logged In");
      }
    } catch (error) {
      // if (isFirebaseAuthError(error)) {
      //   const firebaseError = error as FireBaseAuthError;
      //   const errorCode = firebaseError.code;
      //   const errorMessage = firebaseError.message;
      //   console.log(errorCode);
      //   console.log(errorMessage);
      // }
      setMessage("Unable to Login");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      // console.log(user);
      setMessage("Logged In");
    } catch (error) {
      // if (isFirebaseAuthError(error)) {
      //   const firebaseError = error as FireBaseAuthError;
      //   const errorCode = firebaseError.code;
      //   const errorMessage = firebaseError.message;
      //   //const email = error.customData.email;
      //   // const credential = GoogleAuthProvider.credentialFromError(error);
      //   // console.log(errorCode);
      //   // console.log(errorMessage);
      // }
      setMessage("Unable to Login");
    }
  };
  const handleVerifyEmail = async () => {
    try {
      if (user != null) {
        await sendEmailVerification(user);
        setVerifyEmail(false);
        setMessage("Verification email sent");
      } else {
        setMessage("Unable to send verification email");
      }
    } catch (err) {
      setMessage("Unable to send verification email");
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
      {verifyEmail && (
        <button onClick={handleVerifyEmail}>Send Verification Email</button>
      )}
      {message && <p>{message}</p>}
      <LogOutButton />
      {/* <Users /> */}
    </>
  );
};
