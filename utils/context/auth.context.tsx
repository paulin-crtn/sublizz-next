/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthUser } from "../fetch/fetchUser";
import { IUser } from "../../interfaces/IUser";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAuthContext {
  user: IUser | null;
  setUser: (arg: IUser | null) => void;
  logout: (arg?: () => void) => void;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDER                               */
/* -------------------------------------------------------------------------- */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [user, setUser] = useState<IUser | null>(null);

  /* ------------------------------- REACT QUERY ------------------------------ */
  const queryClient = useQueryClient();

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const jwt = localStorage.getItem("lacartesdeslogements_access_token");
    if (jwt) {
      getAuthUser()
        .then((user) => setUser(user))
        .catch((error) => console.error(error));
    }
  }, []);

  /* -------------------------------- FUNCTION -------------------------------- */
  const logout = (callback?: () => void) => {
    localStorage.removeItem("lacartesdeslogements_access_token");
    queryClient.removeQueries();
    setUser(null);
    callback?.();
  };

  /* -------------------------------- PROVIDER -------------------------------- */
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useAuth = () => useContext(AuthContext);
