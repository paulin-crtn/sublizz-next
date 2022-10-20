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
import toast from "react-hot-toast";
import { customFetch } from "../utils/customFetch";
import { IUser } from "../interfaces/IUser";
import { TOAST_STYLE } from "../const/toast";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAuthContext {
  user: IUser | null;
  setUser: (arg: IUser | null) => void;
  logout: (arg?: () => void) => void;
  // fetchUser: () => Promise<any>;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  logout: () => {},
  // fetchUser: () => Promise.resolve(),
});

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDER                               */
/* -------------------------------------------------------------------------- */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [user, setUser] = useState<IUser | null>(null);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const jwt = localStorage.getItem("sublizz");
    if (jwt) {
      customFetch("users/me", "GET")
        .then((user) => setUser(user))
        .catch((error) => console.error(error));
    }
  }, []);

  /* -------------------------------- FUNCTION -------------------------------- */
  const logout = (callback?: () => void) => {
    localStorage.removeItem("sublizz");
    toast.success(`À bientôt ${user?.firstName}`, {
      style: TOAST_STYLE,
    });
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
