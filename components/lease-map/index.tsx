/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

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
export default function LeaseMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  /* -------------------------------- TEMPLATE -------------------------------- */
  // https://leafletjs.com/reference.html#map-option
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "320px", borderRadius: "16px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={icon}>
        {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
      </Marker>
    </MapContainer>
  );
}
