/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent } from "react";
import Image from "next/future/image";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseDates from "../../shared/lease-dates";
import LeaseChips from "../../shared/lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import noLeaseImg from "../../../public/img/no-lease-img.png";
import { LEASE_IMAGE_PATH } from "../../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseCard: FunctionComponent<{ lease: ILease }> = ({ lease }) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      sx={{
        display: "flex",
        paddingY: 2,
        "@media (max-width: 760px)": {
          display: "block",
        },
      }}
    >
      <CardOverflow sx={{ borderRadius: 10, overflow: "hidden" }}>
        <AspectRatio
          ratio="16/10"
          sx={{
            width: 240,
            "@media (max-width: 760px)": {
              width: "100%",
              maxHeight: "300px",
            },
          }}
        >
          <Image
            src={
              lease.leaseImages && lease.leaseImages[0]
                ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                : noLeaseImg
            }
            alt="lease image"
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={"600px"}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent
        sx={{
          pl: 3,
          "@media (max-width: 760px)": {
            pl: 0,
            pt: 2,
          },
        }}
      >
        <Typography level="h6" fontWeight="600">
          {lease.city}
        </Typography>
        <LeaseDates lease={lease} />
        <LeaseChips lease={lease} size="sm" />
        <Typography level="h6" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
      </CardContent>
    </Box>
  );
};

export default LeaseCard;
