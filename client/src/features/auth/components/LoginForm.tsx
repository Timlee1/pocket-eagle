import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { LogOutButton } from "./LogOutButton";
import { Users } from "@/features/users";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(auth?.currentUser?.email);

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // console.log(userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // console.log(credential);
      const token = credential.accessToken;
      // console.log(token);
      const user = result.user;
      // console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
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
