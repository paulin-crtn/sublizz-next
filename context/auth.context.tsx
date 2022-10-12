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
import { customFetch } from "../utils/customFetch";
import { IUser } from "../interfaces/user";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAuthContext {
  user: IUser | null;
  setUser: (arg: IUser | null) => void;
  // fetchUser: () => Promise<any>;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
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

  /* -------------------------------- PROVIDER -------------------------------- */
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useAuth = () => useContext(AuthContext);
