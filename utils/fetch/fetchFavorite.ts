/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IFavorite } from "../../interfaces/IFavorite";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getFavorites = async (): Promise<IFavorite[]> => {
  return await customFetch("lease-favorites", "GET");
};

export const storeFavorite = async (leaseId: number): Promise<IFavorite> => {
  return await customFetch("lease-favorites", "POST", { leaseId });
};

export const deleteFavorite = async (
  leaseFavoriteId: number
): Promise<{ statusCode: number; message: string }> => {
  return await customFetch(`lease-favorites/${leaseFavoriteId}`, "DELETE");
};
