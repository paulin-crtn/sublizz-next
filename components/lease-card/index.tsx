/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent } from "react";
import Image from "next/image";
import Box from "@mui/joy/Box";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import LeaseChips from "../lease-chips";
import noLeaseImg from "../../public/img/no-lease-img.png";
import { ILease } from "../../interfaces/lease";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";
import LeaseDates from "../lease-dates";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseCard: FunctionComponent<{ lease: ILease }> = ({ lease }) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ display: "flex", paddingY: 2 }}>
      <CardOverflow sx={{ borderRadius: 10, overflow: "hidden" }}>
        <AspectRatio ratio="16/10" sx={{ width: 240 }}>
          <Image
            src={
              lease.leaseImages && lease.leaseImages[0]
                ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                : noLeaseImg
            }
            layout="fill"
            priority={true}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 3 }}>
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
