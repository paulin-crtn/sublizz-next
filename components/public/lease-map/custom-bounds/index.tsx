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
        { maxZoom: leases.length === 1 ? 11 : undefined, animate: false }
      );
    }
    map.on("zoomanim dragend", function () {
      // Get new bounds to fetch new leases based on coordinates
      const bounds = map.getBounds();
      const urlBoundsCoordinates = _getUrlBoundCoordinates(bounds);
      router.push(`leases?${urlBoundsCoordinates}`);
    });
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
        { maxZoom: leases.length === 1 ? 11 : undefined, animate: false }
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
