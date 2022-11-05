/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/fetch/customFetch";
import { IFavorite } from "../interfaces/IFavorite";
import { IUser } from "../interfaces/IUser";
import { TOAST_STYLE } from "../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ user: IUser | null }>;

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IFavoriteContext {
  leaseFavorites: IFavorite[];
  store: (leaseId: number) => void;
  remove: (id: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const FavoriteContext = createContext<IFavoriteContext>({
  leaseFavorites: [],
  store: () => {},
  remove: () => {},
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

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const store = async (leaseId: number) => {
    try {
      const leaseFavorite = await customFetch("lease-favorites", "POST", {
        leaseId,
      });
      setLeaseFavorites((prevState: IFavorite[]) => [
        ...prevState,
        leaseFavorite,
      ]);
      toast.success("Annonce ajoutée aux favoris", {
        style: TOAST_STYLE,
      });
    } catch (err) {
      toast.error("Une erreur est survenue", {
        style: TOAST_STYLE,
      });
    }
  };

  const remove = async (id: number) => {
    try {
      await customFetch("lease-favorites/" + id, "DELETE");
      setLeaseFavorites((prevState: IFavorite[]) =>
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
    <FavoriteContext.Provider value={{ leaseFavorites, store, remove }}>
      {children}
    </FavoriteContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useFavorite = () => useContext(FavoriteContext);
