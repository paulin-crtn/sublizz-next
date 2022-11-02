/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent } from "react";
import Image from "next/image";
import format from "date-fns/format";
import Box from "@mui/joy/Box";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import LeaseChips from "../lease-chips";
import noLeaseImg from "../../public/img/no-lease-img.png";
import { ILease } from "../../interfaces/lease";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";

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
              lease.leaseImages[0]
                ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                : noLeaseImg
            }
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
            gap: 2,
          }}
        >
          <Typography level="h5" fontWeight="600">
            {lease.city}
          </Typography>
          <Typography level="h6" fontWeight="300">
            {lease.pricePerMonth}€ CC
          </Typography>
        </Sheet>

        <Sheet sx={{ mt: 2, mb: 3 }}>
          {!lease.endDate && (
            <Typography level="body1" fontWeight={300}>
              À partir du {format(new Date(lease.startDate), "dd MMM uuuu")}
            </Typography>
          )}
          {lease.endDate && (
            <Typography level="body1" fontWeight={300}>
              Du {format(new Date(lease.startDate), "dd MMM uuuu")} au{" "}
              {format(new Date(lease.endDate), "dd MMM uuuu")}
            </Typography>
          )}
          {!!lease.isDateFlexible && (
            <Chip variant="soft" color="neutral" size="sm" sx={{ mt: 0.5 }}>
              Dates flexibles
            </Chip>
          )}
        </Sheet>

        <LeaseChips lease={lease} size="sm" />
      </CardContent>
    </Box>
  );
};

export default LeaseCard;
