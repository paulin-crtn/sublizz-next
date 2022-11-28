/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useRouter } from "next/router";
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
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const getCenter = () => {
    if (isMultiple) {
      // Compute the average lat and lng based on query params (URL)
      if (!leases.length && router.query.lat && router.query.lng) {
        const latitudes = (router.query.lat as string).split(",");
        const longitudes = (router.query.lng as string).split(",");
        const lat = (+latitudes[0] + +latitudes[1]) / 2;
        const lng = (+longitudes[0] + +longitudes[1]) / 2;
        return { lat, lng };
      }
      // No need to center as fitBounds will take over in CustomBounds
      return undefined;
    }
    // Use to display a static single lease on a map (leases/:id)
    return { lat: leases[0].gpsLatitude, lng: leases[0].gpsLongitude };
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  // https://leafletjs.com/reference.html#map-option
  return (
    <MapContainer
      center={getCenter()}
      zoom={13}
      minZoom={6}
      maxZoom={16}
      scrollWheelZoom={false}
      maxBounds={[
        [41.934977, -4.965461],
        [51.165567, 9.119012],
      ]}
      style={{ height: "100%" }}
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
