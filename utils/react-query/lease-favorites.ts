/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { QueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteFavorite,
  getFavorites,
  storeFavorite,
} from "../fetch/fetchFavorite";
import { IUserDetail } from "../../interfaces/IUserDetail";
import { IFavorite } from "../../interfaces/IFavorite";
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
export const useLeaseFavorites = (user: IUserDetail | null) =>
  useQuery<IFavorite[]>(["lease-favorites"], getFavorites, {
    enabled: !!user,
    initialData: [],
  });

export const storeLeaseFavorite = (
  queryClient: QueryClient,
  leaseId: number
) => {
  storeFavorite(leaseId)
    .then((data: IFavorite) => {
      queryClient.setQueryData(
        ["lease-favorites"],
        (prevState: IFavorite[] | undefined) =>
          prevState ? [...prevState, data] : [data]
      );
      toast.success("Annonce ajoutée aux favoris", {
        style: TOAST_STYLE,
      });
    })
    .catch(() => {
      toast.error("Une erreur est survenue", {
        style: TOAST_STYLE,
      });
    });
};

export const deleteLeaseFavorite = (
  queryClient: QueryClient,
  leaseFavoriteId: number
) => {
  deleteFavorite(leaseFavoriteId)
    .then(() => {
      queryClient.setQueryData(
        ["lease-favorites"],
        (prevState: IFavorite[] | undefined) =>
          prevState?.filter(
            (favorite: IFavorite) => favorite.id !== leaseFavoriteId
          )
      );
      toast.success("Annonce retirée des favoris", {
        style: TOAST_STYLE,
      });
    })
    .catch(() => {
      toast.error("Une erreur est survenue", {
        style: TOAST_STYLE,
      });
    });
};
