/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { customFetch } from "../utils/fetch/customFetch";
import { IFavorite } from "../interfaces/IFavorite";
import { IUser } from "../interfaces/IUser";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ user: IUser | null }>;

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IFavoriteContext {
  leaseFavorites: IFavorite[];
  setLeaseFavorites: Dispatch<SetStateAction<IFavorite[]>>;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const FavoriteContext = createContext<IFavoriteContext>({
  leaseFavorites: [],
  setLeaseFavorites: () => {},
});

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDER                               */
/* -------------------------------------------------------------------------- */
export const FavoriteProvider = ({ children, user }: Props) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [leaseFavorites, setLeaseFavorites] = useState<IFavorite[]>([]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    if (user) {
      customFetch("lease-favorites", "GET")
        .then((favorites) => setLeaseFavorites(favorites))
        .catch((error) => console.error(error));
    } else {
      setLeaseFavorites([]);
    }
  }, [user]);

  /* -------------------------------- PROVIDER -------------------------------- */
  return (
    <FavoriteContext.Provider value={{ leaseFavorites, setLeaseFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useFavorite = () => useContext(FavoriteContext);
