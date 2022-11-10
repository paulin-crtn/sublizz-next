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
import { customFetch } from "../utils/fetch/customFetch";
import { IFavorite } from "../interfaces/IFavorite";
import { TOAST_STYLE } from "../const/toastStyle";
import { useAuth } from "./auth.context";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IFavoriteContext {
  favorites: IFavorite[];
  storeFavorite: (leaseId: number) => void;
  removeFavorite: (id: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const FavoriteContext = createContext<IFavoriteContext>({
  favorites: [],
  storeFavorite: () => {},
  removeFavorite: () => {},
});

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDER                               */
/* -------------------------------------------------------------------------- */
export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [favorites, setFavorites] = useState<IFavorite[]>([]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    if (user) {
      customFetch("lease-favorites", "GET")
        .then((favorites) => setFavorites(favorites))
        .catch((error) => console.error(error));
    } else {
      setFavorites([]);
    }
  }, [user]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const storeFavorite = async (leaseId: number) => {
    try {
      const leaseFavorite = await customFetch("lease-favorites", "POST", {
        leaseId,
      });
      setFavorites((prevState: IFavorite[]) => [leaseFavorite, ...prevState]);
      toast.success("Annonce ajoutée aux favoris", {
        style: TOAST_STYLE,
      });
    } catch (err) {
      toast.error("Une erreur est survenue", {
        style: TOAST_STYLE,
      });
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      await customFetch("lease-favorites/" + id, "DELETE");
      setFavorites((prevState: IFavorite[]) =>
        prevState.filter((leaseFavorite: IFavorite) => leaseFavorite.id != id)
      );
      toast.success("Annonce retirée des favoris", {
        style: TOAST_STYLE,
      });
    } catch (err) {
      toast.error("Une erreur est survenue", {
        style: TOAST_STYLE,
      });
    }
  };

  /* -------------------------------- PROVIDER -------------------------------- */
  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        storeFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useFavorite = () => useContext(FavoriteContext);
