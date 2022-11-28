/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomBounds = ({ leases }: { leases: ILeaseDetail[] }) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* --------------------------------- USE MAP -------------------------------- */
  const map = useMap();

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const addEventListener = () => {
    map.on("zoomend dragend", function () {
      const bounds = map.getBounds();
      const urlBoundsCoordinates = _getUrlBoundCoordinates(bounds);
      // Fetch new leases based on bounds coordinates
      router.push(`leases?${urlBoundsCoordinates}`);
    });
  };

  const fitBounds = (leases: ILeaseDetail[]) => {
    map.fitBounds(
      leases.map((lease: ILeaseDetail) => [
        lease.gpsLatitude,
        lease.gpsLongitude,
      ]),
      {
        maxZoom: leases.length === 1 ? 11 : undefined,
        animate: false,
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
    if (!!leases.length && router.query.lat && router.query.lng) {
      fitBounds(leases); // Will trigger a zoom for 0.25s
      setTimeout(() => addEventListener(), 500); // So we set a timeout for the zoom event listener
    }
  }, []);

  /**
   * Fit bounds and add event listener on every render
   * FOR CITY SEARCH
   */
  useEffect(() => {
    if (!map) return;
    if (!!leases.length && !router.query.lat && !router.query.lng) {
      /**
       * Remove previous event listener before calling fitBounds
       * otherwise it will trigger "zoomend" event (fitBounds set
       * a new view which set a new zoom during 0.25s)
       */
      if (
        map.hasEventListeners("zoomend") &&
        map.hasEventListeners("dragend")
      ) {
        map.off("zoomend dragend");
      }
      fitBounds(leases); // Will trigger a zoom for 0.25s
      setTimeout(() => addEventListener(), 500); // So we set a timeout for the zoom event listener
    }
  }, [map, router.query, leases]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return null;
};

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _getUrlBoundCoordinates = (bounds: LatLngBounds) => {
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();
  return `lat=${southWest.lat.toFixed(6)},${northEast.lat.toFixed(
    6
  )}&lng=${southWest.lng.toFixed(6)},${northEast.lng.toFixed(6)}`;
};

export default CustomBounds;
