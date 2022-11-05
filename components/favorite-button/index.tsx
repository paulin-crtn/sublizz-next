/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useMemo } from "react";
import { useFavorite } from "../../context/favorite.context";
import Button from "@mui/joy/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { customFetch } from "../../utils/fetch/customFetch";
import { ILease } from "../../interfaces/lease";
import { IFavorite } from "../../interfaces/IFavorite";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const FavoriteButton: FunctionComponent<{
  leaseId: number;
}> = ({ leaseId }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { leaseFavorites, setLeaseFavorites } = useFavorite();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const leaseFavorite: IFavorite | undefined = useMemo(
    () =>
      leaseFavorites?.find(
        (leaseFavorite: IFavorite) => leaseFavorite.lease.id === leaseId
      ),
    [leaseId, leaseFavorites]
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const store = async () => {
    const leaseFavorite = await customFetch("lease-favorites", "POST", {
      leaseId,
    });
    setLeaseFavorites((prevState: IFavorite[]) => [
      ...prevState,
      leaseFavorite,
    ]);
  };

  const remove = async (id: number) => {
    await customFetch("lease-favorites/" + id, "DELETE");
    setLeaseFavorites((prevState: IFavorite[]) =>
      prevState.filter((leaseFavorite: IFavorite) => leaseFavorite.id != id)
    );
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (leaseFavorite) {
    return (
      <Button
        fullWidth
        variant="outlined"
        startDecorator={<FavoriteIcon />}
        onClick={() => remove(leaseFavorite.id)}
        sx={{ mt: 1, backgroundColor: "#ffffff" }}
      >
        Sauvegarder l'annonce
      </Button>
    );
  }
  return (
    <Button
      fullWidth
      variant="outlined"
      startDecorator={<FavoriteBorderIcon />}
      onClick={store}
      sx={{ mt: 1, backgroundColor: "#ffffff" }}
    >
      Sauvegarder l'annonce
    </Button>
  );
};

export default FavoriteButton;
