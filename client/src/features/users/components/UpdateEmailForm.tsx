import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";

export const UpdateEmailForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const handleUpdateEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        await verifyBeforeUpdateEmail(user, email);
        setMessage("Update email was sent");
      }
    } catch (error) {
      setMessage("Unable to send update email");
    }
  };
  if (user?.authProvider === "password") {
    return (
      <>
        <label htmlFor="email">New Email:</label>
        <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={handleUpdateEmail}>Submit</button>
        {message && <p>{message}</p>}
      </>
    );
  }
};
