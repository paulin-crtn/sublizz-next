"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
/* ----------------------------------- MUI ---------------------------------- */
import CircularProgress from "@mui/joy/CircularProgress";
import Button from "@mui/joy/Button";
/* ------------------------------- INTERFACES ------------------------------- */
import {
  ICityCoordinates,
  ILeaseDetail,
} from "../../../../../interfaces/lease";

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
  const searchParams = useSearchParams();

  /* --------------------------------- USE MAP -------------------------------- */
  const map = useMap();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ----------------------------- REACT CALLBACK ----------------------------- */
  const addEventListeners = useCallback(() => {
    map.on("zoomend dragend", function () {
      const bounds = map.getBounds();
      const urlBoundsCoordinates = _getUrlBoundCoordinates(bounds);
      // Fetch new leases based on bounds coordinates
      setIsLoading(true);
      router.replace(`leases?${urlBoundsCoordinates}`);
    });
  }, [map, router]);

  const removeEventListeners = useCallback(() => {
    if (map.hasEventListeners("zoomend")) {
      map.off("zoomend");
    }
    if (map.hasEventListeners("dragend")) {
      map.off("dragend");
    }
  }, [map]);

  const fitLeasesBounds = useCallback(
    (leases: ILeaseDetail[]) => {
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
    },
    [map]
  );

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Fit bounds and add event listener on first render
   * FOR LAT AND LNG SEARCH
   */
  useEffect(() => {
    if (!map) return;
    const latitudes = searchParams.get("latitudes");
    const longitudes = searchParams.get("longitudes");
    if (latitudes && longitudes) {
      if (!!leases.length) {
        fitLeasesBounds(leases); // Will trigger a zoom for 0.25s
      } else {
        const latitudesArr = (latitudes as string).split(",");
        const longitudesArr = (longitudes as string).split(",");
        // Will trigger a zoom for 0.25s
        map.fitBounds([
          [+latitudesArr[0], +longitudesArr[0]],
          [+latitudesArr[1], +longitudesArr[1]],
        ]);
      }
      setTimeout(() => addEventListeners(), 350); // So we set a timeout for the zoom event listener
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fit bounds and add event listener on every render
   * FOR CITY SEARCH
   */
  useEffect(() => {
    if (!map) return;
    const latitudes = searchParams.get("latitudes");
    const longitudes = searchParams.get("longitudes");
    if (!latitudes && !longitudes) {
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
  }, [
    map,
    searchParams,
    leases,
    cityCoordinates,
    addEventListeners,
    removeEventListeners,
    fitLeasesBounds,
  ]);

  /**
   * Set isLoading to false when new data is fetched
   */
  useEffect(() => setIsLoading(false), [leases]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      {isLoading && (
        <Button
          startDecorator={
            <CircularProgress
              size="sm"
              thickness={3}
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
            fontWeight: "500",
            backgroundColor: "#000000",
            color: "#ffffff",
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
