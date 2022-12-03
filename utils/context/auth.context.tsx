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
import { IUserDetail } from "../../interfaces/IUserDetail";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAuthContext {
  user: IUserDetail | null;
  setUser: (arg: IUserDetail | null) => void;
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
  const [user, setUser] = useState<IUserDetail | null>(null);

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
