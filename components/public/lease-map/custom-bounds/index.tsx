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

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Fit bounds and add event listener on first render
   */
  useEffect(() => {
    if (!map) return;
    if (!!leases.length) {
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
    }
    /**
     * Because fitBounds set a new view (including a zoom) we need to wait
     * the end of its execution (0.25s) before setting the event listener
     * (otherwise it will trigger the event and push a new URL)
     */
    setTimeout(
      () =>
        /**
         * Event "zoomanim" isn't triggered by fitBounds
         * but doesn't work well when zooming out
         */
        map.on("zoomend dragend", function () {
          const bounds = map.getBounds();
          const urlBoundsCoordinates = _getUrlBoundCoordinates(bounds);
          // Fetch new leases based on bounds coordinates
          router.push(`leases?${urlBoundsCoordinates}`);
        }),
      500
    );
  }, []);

  /**
   * Fit bounds on new city search
   */
  useEffect(() => {
    if (!map) return;
    if (!!leases.length && !router.query.lat && !router.query.lng) {
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
