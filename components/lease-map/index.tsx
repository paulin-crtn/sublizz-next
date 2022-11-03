/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useRouter } from "next/router";
import Image from "next/image";
import format from "date-fns/format";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import LeaseChips from "../lease-chips";
import Typography from "@mui/joy/Typography";
import { ILeaseDetail } from "../../interfaces/lease";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";
import noLeaseImg from "../../public/img/no-lease-img.png";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const icon = new Icon({
  iconUrl: "/img/dot.svg",
  iconSize: [16, 16],
  iconAnchor: [8, 16],
  popupAnchor: [0, -16],
});

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function LeaseMap({
  leases,
  isMultiple,
}: {
  leases: ILeaseDetail[];
  isMultiple: boolean;
}) {
  /* -------------------------------- TEMPLATE -------------------------------- */
  // https://leafletjs.com/reference.html#map-option
  return (
    <MapContainer
      center={[leases[0].gpsLatitude, leases[0].gpsLongitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: isMultiple ? "calc(100vh - 160px)" : "340px",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isMultiple && <Bounds leases={leases} />}
      {leases.map((lease: ILeaseDetail) => (
        <Marker
          key={lease.id}
          position={[lease.gpsLatitude, lease.gpsLongitude]}
          icon={icon}
        >
          {isMultiple && <CustomPopup lease={lease} />}
        </Marker>
      ))}
    </MapContainer>
  );
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Bounds = ({ leases }: { leases: ILeaseDetail[] }) => {
  const map = useMap();
  map.fitBounds(
    leases.map((lease: ILeaseDetail) => [lease.gpsLatitude, lease.gpsLongitude])
  );
  return null;
};

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomPopup = ({ lease }: { lease: ILeaseDetail }) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Popup className="popup" maxWidth={400}>
      <Card
        row
        onClick={() => {
          router.push(`/leases/${lease.id}`);
        }}
        sx={{ maxWidth: 400, cursor: "pointer", boxShadow: "none" }}
      >
        <CardOverflow>
          <AspectRatio ratio="1" sx={{ width: 120 }}>
            <Image
              src={
                lease.leaseImages[0]
                  ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                  : noLeaseImg
              }
              loading="lazy"
              alt="Photo principale de l'annonce"
              layout="fill"
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent sx={{ px: 2 }}>
          <Typography level="h6">{lease.pricePerMonth}€</Typography>
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
