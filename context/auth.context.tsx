/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../interfaces/user";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAuthContext {
  jwt: string | null;
  setJwt: (arg: string | null) => void;
  user: IUser | null;
  setUser: (arg: IUser | null) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTEXT                                  */
/* -------------------------------------------------------------------------- */
const AuthContext = createContext<IAuthContext>({
  jwt: null,
  setJwt: () => {},
  user: null,
  setUser: () => {},
});

/* -------------------------------------------------------------------------- */
/*                                  PROVIDER                                  */
/* -------------------------------------------------------------------------- */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ jwt, setJwt, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
