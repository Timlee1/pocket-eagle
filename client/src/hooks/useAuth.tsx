import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAppDispatch } from "@/stores/hooks";
import { logIn, logOut } from "@/features/auth";
import { type User } from "@/features/users";

type AuthState = { authenticated: boolean; initializing: boolean };

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    initializing: true,
  });
  const [user, setUser] = useState<User>(undefined);

  const updatedSuccessfulAuth = {
    authenticated: true,
    initializing: false,
  };
  const updatedFailedAuth = {
    authenticated: false,
    initializing: false,
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (userAuth) => {
      try {
        if (userAuth && userAuth.email && userAuth.emailVerified) {
          const token = await userAuth.getIdToken(true);
          dispatch(logIn(token));
          setAuthState((prevState) => ({
            ...prevState,
            ...updatedSuccessfulAuth,
          }));
          const authProvider = userAuth.providerData[0].providerId;
          if (authProvider === "password" || authProvider === "google.com") {
            const updatedUser: User = {
              email: userAuth.email,
              authProvider: authProvider,
            };
            setUser((prevState) => ({
              ...prevState,
              ...updatedUser,
            }));
          }
        } else {
          dispatch(logOut());
          setAuthState((prevState) => ({
            ...prevState,
            ...updatedFailedAuth,
          }));
          setUser(undefined);
        }
      } catch (e) {
        dispatch(logOut());
        setAuthState((prevState) => ({
          ...prevState,
          ...updatedFailedAuth,
        }));
        setUser(undefined);
      }
    });
    return () => {
      listener();
    };
  }, [auth]);

  return { authState, user };
};
