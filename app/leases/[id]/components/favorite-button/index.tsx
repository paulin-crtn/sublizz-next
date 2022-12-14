/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, FunctionComponent, SetStateAction, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import {
  deleteLeaseFavorite,
  useLeaseFavorites,
  storeLeaseFavorite,
} from "../../../../../utils/react-query/lease-favorites";
/* ----------------------------------- MUI ---------------------------------- */
import IconButton from "@mui/joy/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
/* ------------------------------- INTERFACES ------------------------------- */
import { IFavorite } from "../../../../../interfaces/IFavorite";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../../../../enum/UserRoleEnum";
import { TOAST_STYLE } from "../../../../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const FavoriteButton: FunctionComponent<{
  leaseId: number;
  setOpenSignAlert: Dispatch<SetStateAction<boolean>>;
}> = ({ leaseId, setOpenSignAlert }) => {
  /* ------------------------------ QUERY CLIENT ------------------------------ */
  const queryClient = useQueryClient();

  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { data: favorites } = useLeaseFavorites(user);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const leaseFavorite: IFavorite | undefined = useMemo(() => {
    if (user) {
      return favorites?.find(
        (leaseFavorite: IFavorite) => leaseFavorite.lease.id === leaseId
      );
    }
  }, [user, leaseId, favorites]);

  /* -------------------------------- FUNCTION -------------------------------- */
  const handleClick = () => {
    if (leaseFavorite) {
      deleteLeaseFavorite(queryClient, leaseFavorite.id);
    } else {
      if (user) {
        if (user.role === UserRoleEnum.SEEKER) {
          storeLeaseFavorite(queryClient, leaseId);
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
    <IconButton
      size="lg"
      color="neutral"
      onClick={handleClick}
      sx={{
        width: "fit-content",
        marginLeft: "auto",
        padding: 1.5,
        borderRadius: "9999px",
      }}
    >
      {leaseFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
