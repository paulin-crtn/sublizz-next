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
import { UserRoleEnum } from "../../enum/UserRoleEnum";
import toast from "react-hot-toast";
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const FavoriteButton: FunctionComponent<{
  leaseId: number;
  setOpenSignAlert: Dispatch<SetStateAction<boolean>>;
}> = ({ leaseId, setOpenSignAlert }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { favorites, storeFavorite, removeFavorite } = useFavorite();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const leaseFavorite: IFavorite | undefined = useMemo(() => {
    if (user) {
      return favorites?.find(
        (leaseFavorite: IFavorite) => leaseFavorite.lease.id === leaseId
      );
    }
  }, [leaseId, favorites]);

  /* -------------------------------- FUNCTION -------------------------------- */
  const handleClick = () => {
    if (leaseFavorite) {
      removeFavorite(leaseFavorite.id);
    } else {
      if (user) {
        if (user.role === UserRoleEnum.SEEKER) {
          storeFavorite(leaseId);
        } else {
          toast.error(
            "Action reservée aux utilisateurs à la recherche d'un logement",
            { style: TOAST_STYLE }
          );
        }
      } else {
        setOpenSignAlert(true);
      }
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Button
      size="lg"
      variant="outlined"
      color={leaseFavorite ? "primary" : "neutral"}
      onClick={handleClick}
      sx={{ width: "fit-content", marginLeft: "auto" }}
    >
      {leaseFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  );
};

export default FavoriteButton;
