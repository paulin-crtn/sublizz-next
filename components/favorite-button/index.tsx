/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useMemo } from "react";
import toast from "react-hot-toast";
import { useFavorite } from "../../context/favorite.context";
import Button from "@mui/joy/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { customFetch } from "../../utils/fetch/customFetch";
import { IFavorite } from "../../interfaces/IFavorite";
import { TOAST_STYLE } from "../../const/toastStyle";

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
      onClick={store}
      sx={{ mt: 1, backgroundColor: "#ffffff" }}
    >
      Ajouter aux favoris
    </Button>
  );
};

export default FavoriteButton;
