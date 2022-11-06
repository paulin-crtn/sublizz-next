/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, FunctionComponent, SetStateAction, useMemo } from "react";
import { useAuth } from "../../context/auth.context";
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
  setOpenSignAlert: Dispatch<SetStateAction<boolean>>;
}> = ({ leaseId, setOpenSignAlert }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { leaseFavorites, store, remove } = useFavorite();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const leaseFavorite: IFavorite | undefined = useMemo(() => {
    if (user) {
      return leaseFavorites?.find(
        (leaseFavorite: IFavorite) => leaseFavorite.lease.id === leaseId
      );
    }
  }, [leaseId, leaseFavorites]);

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
      onClick={() => (user ? store(leaseId) : setOpenSignAlert(true))}
      sx={{ mt: 1, backgroundColor: "#ffffff" }}
    >
      Ajouter aux favoris
    </Button>
  );
};

export default FavoriteButton;
