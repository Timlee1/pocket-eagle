import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserToken } from "@/features/auth";
import { onAuthStateChanged } from "firebase/auth";
import { logIn, logOut } from "@/features/auth";
import { auth } from "@/config/firebase";

export const useAuth = () => {
  const dispatch = useDispatch();
  const selector = useSelector(selectUserToken);
  const [userAuth, setUserAuth] = useState(selector);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        userAuth
          .getIdToken(true)
          .then((token) => {
            // console.log(token);
            dispatch(logIn(token));
          })
          .catch((e) => {
            console.log(e);
          });
        // CHANGE THIS store use info
      } else {
        dispatch(logOut());
      }
    });
  }, []);

  return [userAuth, setUserAuth];
};
