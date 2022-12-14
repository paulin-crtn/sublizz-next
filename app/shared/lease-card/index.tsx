/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent } from "react";
import Image from "next/image";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseDates from "../lease-dates";
import LeaseChips from "../lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Favorite from "@mui/icons-material/Favorite";
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
    <Card variant="outlined">
      <CardOverflow>
        <AspectRatio ratio="1.8">
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
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="neutral"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent sx={{ marginY: 3 }}>
        <Typography level="h5" fontWeight="600" mb={2}>
          {lease.city}
        </Typography>
        <LeaseChips lease={lease} size="sm" />
        <Typography level="h5" fontWeight="300" mt={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        sx={{
          py: 1.5,
          bgcolor: "background.level1",
        }}
      >
        <LeaseDates lease={lease} />
      </CardOverflow>
    </Card>
  );
};

export default LeaseCard;
