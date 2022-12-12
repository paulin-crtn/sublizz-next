/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
/* ---------------------------------- UTILS --------------------------------- */
import { deleteLeaseFavorite } from "../../../../../utils/react-query/lease-favorites";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseChips from "../../../../shared/lease-chips";
import LeaseDates from "../../../../shared/lease-dates";
/* ----------------------------------- MUI ---------------------------------- */
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import DeleteIcon from "@mui/icons-material/Delete";
/* ------------------------------- INTERFACES ------------------------------- */
import { IFavorite } from "../../../../../interfaces/IFavorite";
/* -------------------------------- CONSTANTS ------------------------------- */
import noLeaseImg from "../../../../../public/img/no-lease-img.png";
import { LEASE_IMAGE_PATH } from "../../../../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseFavorite: FunctionComponent<{ leaseFavorite: IFavorite }> = ({
  leaseFavorite,
}) => {
  /* ------------------------------ QUERY CLIENT ------------------------------ */
  const queryClient = useQueryClient();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const image = useMemo(
    () =>
      leaseFavorite.lease?.leaseImages && leaseFavorite.lease?.leaseImages[0]
        ? leaseFavorite.lease?.leaseImages[0]
        : undefined,
    [leaseFavorite]
  );

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ display: "flex", padding: 1.5 }}>
      <CardOverflow sx={{ borderRadius: 10, overflow: "hidden" }}>
        <AspectRatio ratio="16/12.1" sx={{ width: 200 }}>
          <Image
            src={image ? LEASE_IMAGE_PATH + "/" + image : noLeaseImg}
            alt="lease image"
            fill={true}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ display: "flex", flexDirection: "row", pl: 3 }}>
        <Box sx={{ flex: "1 1" }}>
          <Typography level="h5" fontWeight="600">
            {leaseFavorite.lease.city}
          </Typography>
          <LeaseDates lease={leaseFavorite.lease} />
          <LeaseChips lease={leaseFavorite.lease} size="sm" />
          <Typography level="h6" fontWeight="300" marginTop={2}>
            {leaseFavorite.lease.pricePerMonth}€ CC
          </Typography>
        </Box>

        <Box sx={{ flex: "0 0 200px" }}>
          <Link href={"/leases/" + leaseFavorite.lease.id}>
            <Button size="sm" variant="soft" fullWidth sx={{ marginBottom: 1 }}>
              Voir l'annonce
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            fullWidth
            startDecorator={<DeleteIcon />}
            onClick={() => deleteLeaseFavorite(queryClient, leaseFavorite.id)}
          >
            Retirer des favoris
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default LeaseFavorite;
