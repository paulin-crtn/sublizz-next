/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import format from "date-fns/format";
import { useFavorite } from "../../context/favorite.context";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import LeaseChips from "../lease-chips";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import noLeaseImg from "../../public/img/no-lease-img.png";
import { IFavorite } from "../../interfaces/IFavorite";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseFavorite: FunctionComponent<{ leaseFavorite: IFavorite }> = ({
  leaseFavorite,
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { removeFavorite } = useFavorite();

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
          <Typography fontWeight="400">
            {leaseFavorite.lease.pricePerMonth}€ CC
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

        <Box marginTop={2.5}>
          <Link href={"/leases/" + leaseFavorite.lease.id}>
            <Button size="sm" variant="soft" sx={{ marginRight: 1 }}>
              Voir l'annonce
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => removeFavorite(leaseFavorite.id)}
          >
            Retirer des favoris
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default LeaseFavorite;
