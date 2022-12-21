"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseCard from "../../../shared/lease-card";
/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(() => import("../lease-map"), {
  ssr: false,
});
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Pagination from "@mui/material/Pagination";
import MapIcon from "@mui/icons-material/Map";
import SubjectIcon from "@mui/icons-material/Subject";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease, ILeasesWithCount } from "../../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const RESULTS_PER_PAGE = 6;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasesPage = ({ data }: { data: ILeasesWithCount }) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isDesktop, setIsDesktop] = useState<boolean>(
    window?.innerWidth >= 1350
  );
  const [showMap, setShowMap] = useState<boolean>(true);
  const [invalidateSize, setInvalidateSize] = useState<boolean>(false);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const pageCount = useMemo(
    () => Math.ceil(data.totalCount / RESULTS_PER_PAGE),
    [data.totalCount]
  );

  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? +page : 1;
  }, [searchParams]);

  const city = useMemo(() => searchParams.get("city"), [searchParams]);

  const latitudes = useMemo(
    () => searchParams.get("latitudes"),
    [searchParams]
  );

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Refetch server-side data.
   * This is because NextJS keep state between navigation
   */
  useEffect(() => router.refresh(), []);

  /**
   * Add event listener to compute screen size when viewport changes
   */
  useEffect(() => {
    window.addEventListener("resize", setInnerWidth);
    return () => window.removeEventListener("resize", setInnerWidth);
  }, []);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onDataPageChange = (event: any, page: number) => {
    let url = city ? `city=${city}&page=${page}` : `page=${page}`;
    router.push(`/leases?${url}`);
    window.scrollTo(0, 0);
  };

  const setInnerWidth = () => {
    if (window.innerWidth >= 1350) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
      setShowMap(true);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Box component="main">
        <Divider sx={{ position: "sticky", top: 90 }} />
        <Box display="flex" sx={{ position: "relative" }}>
          <Box
            flex="1 0 55%"
            display={isDesktop || !showMap ? "block" : "none"}
            sx={{
              marginTop: 3,
              marginBottom: 5,
              paddingX: 6,
              "@media (max-width: 800px)": {
                paddingX: 4,
              },
            }}
          >
            {/** Results count */}
            {!!data.leases.length && (
              <Box mb={3}>
                <Typography fontWeight={500}>
                  {city ? city + " : " : ""}
                  {data.totalCount}{" "}
                  {data.totalCount > 1 ? "logements" : "logement"}
                </Typography>
                {city && (
                  <Typography
                    level="body2"
                    mt={0.5}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/leases")}
                  >
                    Effacer la recherche
                  </Typography>
                )}
              </Box>
            )}

            {/** Lease cards */}
            <Box
              sx={
                isDesktop
                  ? {
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridColumnGap: "20px",
                      gridRowGap: "20px",
                      "@media (max-width: 1300px)": {
                        gridTemplateColumns: "1fr",
                      },
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      gridColumnGap: "20px",
                      gridRowGap: "20px",
                      "@media (max-width: 1250px)": {
                        gridTemplateColumns: "1fr 1fr",
                      },
                      "@media (max-width: 750px)": {
                        gridTemplateColumns: "1fr",
                      },
                    }
              }
            >
              {data.leases.map((lease: ILease) => (
                <LeaseCard key={lease.id} lease={lease} />
              ))}
            </Box>

            {/** Pagination */}
            {!latitudes && data.totalCount > RESULTS_PER_PAGE && (
              <Pagination
                count={pageCount}
                size="large"
                sx={{ width: "fit-content", mt: 4 }}
                onChange={onDataPageChange}
                page={currentPage}
              />
            )}

            {/** No result */}
            {!data.totalCount && (!showMap || isDesktop) && (
              <Box
                sx={{
                  display: "flex",
                  height: "calc(100vh - 210px)",
                }}
              >
                <Box margin="auto" textAlign="center">
                  <Typography level="h5" fontWeight={400} textAlign="center">
                    {city && `Aucun résultat pour ${city}`}
                    {latitudes && `Aucun résultat dans cette zone`}
                  </Typography>
                  <Button
                    variant="soft"
                    sx={{ mt: 3 }}
                    onClick={() => router.push("/leases")}
                  >
                    Effacer la recherche
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/** Map */}
          <Box
            flex={isDesktop ? "0 1 45%" : "1 1 100%"}
            display={showMap ? "block" : "none"}
            sx={{
              position: "sticky",
              top: 91,
              height: "calc(100vh - 91px)",
            }}
          >
            <LeaseMapWithNoSSR
              leases={data.leases}
              isMultiple={true}
              cityCoordinates={data.cityCoordinates}
              invalidateSize={invalidateSize}
            />
          </Box>

          {!isDesktop && (
            <Box sx={{ position: "absolute", top: 18, right: 48 }}>
              {showMap && (
                <Button
                  onClick={() => {
                    setShowMap(false);
                    setInvalidateSize(false);
                  }}
                  startDecorator={<SubjectIcon />}
                  sx={{
                    backgroundColor: "#000000",
                    borderColor: "#000000",
                    "&:hover": { backgroundColor: "#000000" },
                    "&:focus": { backgroundColor: "#000000", color: "#ffffff" },
                    "&:active": {
                      backgroundColor: "#000000",
                      color: "#ffffff",
                    },
                  }}
                >
                  Afficher la liste
                </Button>
              )}
              {!showMap && (
                <Button
                  onClick={() => {
                    setShowMap(true);
                    setInvalidateSize(true);
                  }}
                  startDecorator={<MapIcon />}
                  sx={{
                    backgroundColor: "#000000",
                    borderColor: "#000000",
                    "&:hover": { backgroundColor: "#000000" },
                    "&:focus": { backgroundColor: "#000000", color: "#ffffff" },
                    "&:active": {
                      backgroundColor: "#000000",
                      color: "#ffffff",
                    },
                  }}
                >
                  Afficher la carte
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LeasesPage;
