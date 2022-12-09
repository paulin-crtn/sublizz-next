/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Image from "next/image";
/* -------------------------------- COMPONENT ------------------------------- */
import LeaseDates from "../../../../../components/shared/lease-dates";
import LeaseChips from "../../../../../components/shared/lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { LEASE_IMAGE_PATH } from "../../../../../const/supabasePath";
import noLeaseImg from "../../../../../public/img/no-lease-img.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasePreview = ({ lease }: { lease: ILease }) => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: 220,
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
        <LeaseDates lease={lease} />
        <LeaseChips lease={lease} size="sm" />
        <Typography level="h6" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          fullWidth
          onClick={() => window.open("/leases/" + lease.id, "_blank")}
          sx={{ marginTop: 2 }}
        >
          Voir l'annonce
        </Button>
      </Box>
    </Box>
  );
};

export default LeasePreview;
