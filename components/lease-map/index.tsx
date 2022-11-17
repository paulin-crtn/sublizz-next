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
import { useEffect } from "react";

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
const LeaseMap = ({
  leases,
  isMultiple,
}: {
  leases: ILeaseDetail[];
  isMultiple: boolean;
}) => {
  useEffect(() => {
    console.log(leases);
  }, [leases]);
  /* -------------------------------- TEMPLATE -------------------------------- */
  // https://leafletjs.com/reference.html#map-option
  return (
    <MapContainer
      center={[leases[0].gpsLatitude, leases[0].gpsLongitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "100%",
        borderRadius: "16px",
        zIndex: 1, // Safari : fix borderRadius
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /**
         * https://studio.mapbox.com
         * https://www.youtube.com/watch?v=b6Oh4ZBKf6o
         */
        url="https://api.mapbox.com/styles/v1/paulin-crtn/cla9yw4j6006d14ptbi3jtoou/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGF1bGluLWNydG4iLCJhIjoiY2xhOXlmMTY1MDJudzN2bGZ1YWhwZ3V3biJ9.MLYpFVzGbIR3q0t6tsibxQ"
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
};

export default LeaseMap;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Bounds = ({ leases }: { leases: ILeaseDetail[] }) => {
  const map = useMap();
  map.fitBounds(
    leases.map((lease: ILeaseDetail) => [
      lease.gpsLatitude,
      lease.gpsLongitude,
    ]),
    { maxZoom: 11 }
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
    <Popup className="popup" maxWidth={410}>
      <Card
        row
        onClick={() => {
          router.push(`/leases/${lease.id}`);
        }}
        sx={{ maxWidth: 410, cursor: "pointer", boxShadow: "none" }}
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
              layout="fill"
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
