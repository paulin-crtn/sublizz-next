/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useRouter } from "next/router";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import LeaseChips from "../lease-chips";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { ILeaseDetail } from "../../interfaces/lease";

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
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

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
          {isMultiple && (
            <Popup className="popup">
              <Box
                onClick={() => {
                  router.push(`/leases/${lease.id}`);
                }}
                sx={{ cursor: "pointer" }}
              >
                <Typography level="h6" mb={1}>
                  {lease.pricePerMonth}€
                </Typography>
                <LeaseChips lease={lease} size="sm" />
              </Box>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}

const Bounds = ({ leases }: { leases: ILeaseDetail[] }) => {
  const map = useMap();
  map.fitBounds(
    leases.map((lease: ILeaseDetail) => [lease.gpsLatitude, lease.gpsLongitude])
  );
  return null;
};
