import { useState, useEffect } from "react";
import { selectUserToken } from "@/features/auth";
import { onAuthStateChanged } from "firebase/auth";
import { logIn, logOut } from "@/features/auth";
import { auth } from "@/config/firebase";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectUserToken);
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
      } else {
        dispatch(logOut());
      }
    });
  }, []);

  return [userAuth, setUserAuth];
};
