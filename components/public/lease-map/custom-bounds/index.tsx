/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
/* ----------------------------------- MUI ---------------------------------- */
import CircularProgress from "@mui/joy/CircularProgress";
import Button from "@mui/joy/Button";
/* ------------------------------- INTERFACES ------------------------------- */
import { ICityCoordinates, ILeaseDetail } from "../../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomBounds = ({
  leases,
  cityCoordinates,
}: {
  leases: ILeaseDetail[];
  cityCoordinates: ICityCoordinates | undefined;
}) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* --------------------------------- USE MAP -------------------------------- */
  const map = useMap();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const addEventListeners = () => {
    map.on("zoomend dragend", function () {
      const bounds = map.getBounds();
      const urlBoundsCoordinates = _getUrlBoundCoordinates(bounds);
      // Fetch new leases based on bounds coordinates
      setIsLoading(true);
      router.replace(`leases?${urlBoundsCoordinates}`);
    });
  };

  const removeEventListeners = () => {
    if (map.hasEventListeners("zoomend")) {
      map.off("zoomend");
    }
    if (map.hasEventListeners("dragend")) {
      map.off("dragend");
    }
  };

  const fitLeasesBounds = (leases: ILeaseDetail[]) => {
    map.fitBounds(
      leases.map((lease: ILeaseDetail) => [
        lease.gpsLatitude,
        lease.gpsLongitude,
      ]),
      {
        maxZoom: leases.length === 1 ? 11 : undefined,
        padding: [50, 50],
      }
    );
  };

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Fit bounds and add event listener on first render
   * FOR LAT AND LNG SEARCH
   */
  useEffect(() => {
    if (!map) return;
    if (!!leases.length && router.query.latitudes && router.query.longitudes) {
      fitLeasesBounds(leases); // Will trigger a zoom for 0.25s
      setTimeout(() => addEventListeners(), 350); // So we set a timeout for the zoom event listener
    }
  }, []);

  /**
   * Fit bounds and add event listener on every render
   * FOR CITY SEARCH
   */
  useEffect(() => {
    if (!map) return;
    if (!router.query.latitudes && !router.query.longitudes) {
      /**
       * Remove previous event listener before calling fitBounds
       * otherwise it will trigger "zoomend" event (fitBounds set
       * a new view which set a new zoom during 0.25s)
       */
      removeEventListeners();
      if (!!leases.length) {
        fitLeasesBounds(leases); // Will trigger a zoom for 0.25s
      } else {
        if (cityCoordinates) {
          // Will trigger a zoom for 0.25s
          map.fitBounds([[cityCoordinates.lat, cityCoordinates.lng]], {
            maxZoom: 11,
          });
        }
      }
      setTimeout(() => addEventListeners(), 350); // So we set a timeout for the zoom event listener
    }
  }, [map, router.query, leases]);

  /**
   * Set isLoading to false when new data is fetched
   */
  useEffect(() => setIsLoading(false), [leases]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      {isLoading && (
        <Button
          variant="soft"
          color="neutral"
          startDecorator={
            <CircularProgress
              size="sm"
              thickness={4}
              sx={{
                marginRight: 1,
                "--CircularProgress-progress-color": "#000000",
              }}
            />
          }
          sx={{
            position: "absolute",
            top: 18,
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 1000,
            backgroundColor: "#ffffff",
            fontWeight: "500",
          }}
        >
          Chargement
        </Button>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _getUrlBoundCoordinates = (bounds: LatLngBounds) => {
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();
  return `latitudes=${southWest.lat.toFixed(6)},${northEast.lat.toFixed(
    6
  )}&longitudes=${southWest.lng.toFixed(6)},${northEast.lng.toFixed(6)}`;
};

export default CustomBounds;
