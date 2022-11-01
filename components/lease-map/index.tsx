/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ILeaseDetail } from "../../interfaces/lease";
import { useEffect, useMemo } from "react";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const icon = new Icon({
  iconUrl: "/img/placeholder.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  // popupAnchor: [0, 36],
});

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function LeaseMap({ leases }: { leases: ILeaseDetail[] }) {
  /* -------------------------------- TEMPLATE -------------------------------- */
  // https://leafletjs.com/reference.html#map-option
  return (
    <MapContainer
      center={[leases[0].gpsLatitude, leases[0].gpsLongitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: leases.length > 1 ? "calc(100vh - 160px)" : "340px",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {leases.length > 1 && <Bounds leases={leases} />}
      {leases.map((lease: ILeaseDetail) => (
        <Marker
          key={lease.id}
          position={[lease.gpsLatitude, lease.gpsLongitude]}
          icon={icon}
        >
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
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
