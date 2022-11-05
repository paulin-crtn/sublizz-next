/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useMemo } from "react";
import { useFavorite } from "../../context/favorite.context";
import Button from "@mui/joy/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IFavorite } from "../../interfaces/IFavorite";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const FavoriteButton: FunctionComponent<{
  leaseId: number;
}> = ({ leaseId }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { leaseFavorites, store, remove } = useFavorite();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const leaseFavorite: IFavorite | undefined = useMemo(
    () =>
      leaseFavorites?.find(
        (leaseFavorite: IFavorite) => leaseFavorite.lease.id === leaseId
      ),
    [leaseId, leaseFavorites]
  );

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
        Retirer des favoris
      </Button>
    );
  }
  return (
    <Button
      fullWidth
      variant="outlined"
      startDecorator={<FavoriteBorderIcon />}
      onClick={() => store(leaseId)}
      sx={{ mt: 1, backgroundColor: "#ffffff" }}
    >
      Ajouter aux favoris
    </Button>
  );
};

export default FavoriteButton;
