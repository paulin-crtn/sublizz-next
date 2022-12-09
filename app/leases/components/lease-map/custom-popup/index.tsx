"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Image from "next/image";
import format from "date-fns/format";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseChips from "../../../../shared/lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { LEASE_IMAGE_PATH } from "../../../../../const/supabasePath";
import noLeaseImg from "../../../../../public/img/no-lease-img.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomPopup = ({ lease }: { lease: ILeaseDetail }) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Popup className="popup">
      <Card
        row
        onClick={() => {
          window.open(`/leases/${lease.id}`, "_blank");
        }}
        sx={{ cursor: "pointer", boxShadow: "none" }}
      >
        <CardOverflow>
          <AspectRatio ratio="1" sx={{ width: 115 }}>
            <Image
              src={
                lease.leaseImages && lease.leaseImages[0]
                  ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                  : noLeaseImg
              }
              loading="lazy"
              alt="Photo principale de l'annonce"
              fill={true}
              sizes={"115px"}
              style={{ objectFit: "cover" }}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent sx={{ px: 2 }}>
          <Typography
            level="h6"
            fontSize="1rem"
            fontWeight={400}
            sx={{ marginBottom: 0.5 }}
          >
            {lease.pricePerMonth}€ CC
          </Typography>
          {!lease.endDate && (
            <Typography level="body2" fontWeight={300}>
              À partir du {format(new Date(lease.startDate), "dd MMM uuuu")}
            </Typography>
          )}
          {lease.endDate && (
            <Typography level="body2" fontWeight={300}>
              Du {format(new Date(lease.startDate), "dd MMM uuuu")} au{" "}
              {format(new Date(lease.endDate), "dd MMM uuuu")}
            </Typography>
          )}
          <LeaseChips lease={lease} size="sm" />
        </CardContent>
      </Card>
    </Popup>
  );
};

export default CustomPopup;
