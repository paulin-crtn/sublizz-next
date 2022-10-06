/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent } from "react";
import Image from "next/image";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { ILease } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const LeaseCard: FunctionComponent<{ lease: ILease }> = ({ lease }) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Card row>
      <CardOverflow>
        <AspectRatio ratio="16/12.1" sx={{ width: 260 }}>
          <Image src={lease.leaseImages[0].url} layout="fill" priority={true} />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 2 }}>
        <Sheet
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Typography level="body2">
            Disponible du {lease.startDate.toString()} au{" "}
            {lease.endDate.toString()}
          </Typography>
          {lease.isDateFlexible && (
            <Chip variant="soft" color="neutral" size="sm" sx={{ mt: 0.5 }}>
              Dates flexibles
            </Chip>
          )}
        </Sheet>

        <Sheet
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Chip
            size="sm"
            sx={{ mr: 0.75, color: "#ffffff", backgroundColor: "#000000" }}
          >
            {lease.type}
          </Chip>
          <Chip
            variant="outlined"
            size="sm"
            sx={{
              mr: 0.75,
              color: "#000000",
              backgroundColor: "#ffffff",
              borderColor: "#000000",
            }}
          >
            {lease.room} pièces
          </Chip>
          <Chip
            variant="outlined"
            size="sm"
            sx={{
              color: "#000000",
              backgroundColor: "#ffffff",
              borderColor: "#000000",
            }}
          >
            {lease.surface}m2
          </Chip>
        </Sheet>
      </CardContent>
    </Card>
  );
};
