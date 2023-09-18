import { useState } from "react";
import { auth, googleProvider } from "@/config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { LogOutButton } from "./LogOutButton";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log(auth?.currentUser?.email);

  const handleEmailRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      //console.log(userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };
  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      //console.log(userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
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
      <button onClick={handleEmailRegister}>Submit</button>
      <button onClick={handleGoogleRegister}>Sign In With Google</button>
      <LogOutButton />
    </>
  );
};
