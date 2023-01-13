/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Image from "next/image";
/* -------------------------------- COMPONENT ------------------------------- */
import LeaseDates from "../../../shared/lease-dates";
import LeaseChips from "../../../shared/lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { LEASE_IMAGE_PATH } from "../../../../const/objectStoragePath";
import noLeaseImg from "../../../../public/img/no-lease-img.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasePreview = ({ lease }: { lease: ILease }) => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: 280,
          overflow: "hidden",
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
      </Box>

      <Box padding={3}>
        <Typography level="h5" fontWeight="600">
          {lease.city}
        </Typography>
        <Box marginY={2}>
          <LeaseChips lease={lease} size="sm" />
        </Box>
        <LeaseDates
          lease={lease}
          size="sm"
          level="h6"
          fullDate={true}
          showFlexible={true}
        />
        <Typography level="h5" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
        <Button
          color="info"
          variant="outlined"
          fullWidth
          onClick={() => window.open("/leases/" + lease.id, "_blank")}
          sx={{
            marginTop: 2,
            "&:hover": { color: "#000000" },
            "&:active": { color: "#000000" },
          }}
        >
          Voir l'annonce
        </Button>
      </Box>
    </Box>
  );
};

export default LeasePreview;
