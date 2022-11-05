/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useMemo, useState } from "react";
import Image from "next/image";
import format from "date-fns/format";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import LeaseChips from "../lease-chips";
import noLeaseImg from "../../public/img/no-lease-img.png";
import { ILeaseDetail } from "../../interfaces/lease";
import Box from "@mui/joy/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteLease, updateLease } from "../../utils/fetch/fetchLease";
import toast from "react-hot-toast";
import { TOAST_STYLE } from "../../const/toastStyle";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IFavorite } from "../../interfaces/IFavorite";
import { useFavorite } from "../../context/favorite.context";
import { primaryColor } from "../../theme";
import { customFetch } from "../../utils/fetch/customFetch";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseFavorite: FunctionComponent<{ leaseFavorite: IFavorite }> = ({
  leaseFavorite,
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setLeaseFavorites } = useFavorite();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const image = useMemo(
    () =>
      leaseFavorite.lease?.leaseImages && leaseFavorite.lease?.leaseImages[0]
        ? leaseFavorite.lease?.leaseImages[0]
        : undefined,
    [leaseFavorite]
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
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
  return (
    <Box sx={{ display: "flex", padding: 1.5 }}>
      <CardOverflow sx={{ borderRadius: 10, overflow: "hidden" }}>
        <AspectRatio ratio="16/12.1" sx={{ width: 200 }}>
          <Image
            src={image ? LEASE_IMAGE_PATH + "/" + image : noLeaseImg}
            layout="fill"
            priority={true}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 3 }}>
        <Sheet
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h5" fontWeight="600">
            {leaseFavorite.lease.city}
          </Typography>

          <Typography
            fontSize="1.6rem"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: primaryColor.main,
              cursor: "pointer",
            }}
            onClick={() => remove(leaseFavorite.id)}
          >
            <FavoriteIcon />
          </Typography>
        </Sheet>

        <Sheet sx={{ display: "flex", alignItems: "center", mt: 0.5, mb: 2 }}>
          <Box>
            {!leaseFavorite.lease.endDate && (
              <Typography level="body1" fontWeight={300}>
                À partir du{" "}
                {format(new Date(leaseFavorite.lease.startDate), "dd MMM uuuu")}
              </Typography>
            )}
            {leaseFavorite.lease.endDate && (
              <Typography level="body1" fontWeight={300}>
                Du{" "}
                {format(new Date(leaseFavorite.lease.startDate), "dd MMM uuuu")}{" "}
                au{" "}
                {format(new Date(leaseFavorite.lease.endDate), "dd MMM uuuu")}
              </Typography>
            )}
          </Box>
          {!!leaseFavorite.lease.isDateFlexible && (
            <Chip variant="soft" color="neutral" size="sm" sx={{ ml: 1 }}>
              Dates flexibles
            </Chip>
          )}
        </Sheet>

        <LeaseChips lease={leaseFavorite.lease} size="sm" />

        <Typography level="h6" fontWeight="300" marginTop={2}>
          {leaseFavorite.lease.pricePerMonth}€ CC
        </Typography>
      </CardContent>
    </Box>
  );
};

export default LeaseFavorite;
