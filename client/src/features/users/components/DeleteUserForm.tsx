import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";

export const DeleteUserForm = () => {
  const [password, setPassword] = useState("");
  const { user } = useAuth();

  const handleDeleteUser = async () => {
    try {
      const firebaseUser = auth.currentUser;
      if (
        firebaseUser &&
        firebaseUser.email &&
        user?.authProvider === "password"
      ) {
        const credential = EmailAuthProvider.credential(
          firebaseUser.email,
          password,
        );
        await reauthenticateWithCredential(firebaseUser, credential);
        await deleteUser(firebaseUser);
      } else if (
        firebaseUser &&
        firebaseUser.email &&
        user?.authProvider === "google.com"
      ) {
        await deleteUser(firebaseUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleDeleteUser}>Delete User</button>
    </>
  );
};
