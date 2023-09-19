import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";

export const LogOutButton = () => {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      //console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogOut}>Logout</button>;
};
