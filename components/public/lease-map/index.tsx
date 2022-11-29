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
import { ICityCoordinates, ILeaseDetail } from "../../../interfaces/lease";

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
  cityCoordinates,
}: {
  leases: ILeaseDetail[];
  isMultiple: boolean;
  cityCoordinates?: ICityCoordinates;
}) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const getCenter = () => {
    if (isMultiple) {
      // Compute the average lat and lng based on query params (URL)
      if (!leases.length && router.query.latitudes && router.query.longitudes) {
        const latitudesArr = (router.query.latitudes as string).split(",");
        const longitudesArr = (router.query.longitudes as string).split(",");
        const lat = (Number(latitudesArr[0]) + Number(latitudesArr[1])) / 2;
        const lng = (Number(longitudesArr[0]) + Number(longitudesArr[1])) / 2;
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
        [24.766785, -30.935821],
        [61.93895, 25.40207],
      ]}
      style={{ height: "100%" }}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a>'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /**
         * https://studio.mapbox.com
         * https://www.youtube.com/watch?v=b6Oh4ZBKf6o
         */
        attribution='<a href="https://www.mapbox.com/" target="_blank">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/paulin-crtn/cla9yw4j6006d14ptbi3jtoou/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGF1bGluLWNydG4iLCJhIjoiY2xhOXlmMTY1MDJudzN2bGZ1YWhwZ3V3biJ9.MLYpFVzGbIR3q0t6tsibxQ"
      />
      {isMultiple && (
        <CustomBounds leases={leases} cityCoordinates={cityCoordinates} />
      )}
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
