import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";

export const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user } = useAuth();

  const handleUpdatePassword = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (user?.authProvider === "password") {
    return (
      <>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          id="currentPassword"
          onChange={(e) => setCurrentPassword(e.target.value)}
        ></input>
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
        <button onClick={handleUpdatePassword}>Submit</button>
      </>
    );
  }
};
