/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../interfaces/user";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAuthContext {
  user: IUser | null;
  setUser: (arg: IUser | null) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTEXT                                  */
/* -------------------------------------------------------------------------- */
const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

/* -------------------------------------------------------------------------- */
/*                                  PROVIDER                                  */
/* -------------------------------------------------------------------------- */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
