/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
/* ------------------------------- COMPONENTS ------------------------------- */
import CustomPopup from "./custom-popup";
import CustomBounds from "./custom-bounds";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../../interfaces/lease";

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
      {isMultiple && <CustomBounds leases={leases} />}
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
