import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

export const LogOutButton = () => {
  // const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      // navigate("/");
      // navigate(0);
      //console.log(result);
    } catch (error) {
      //console.log(error);
    }
  };
  return <button onClick={handleLogOut}>Logout</button>;
};
