/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseCard from "../../components/public/lease-card";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(
  () => import("../../components/public/lease-map"),
  {
    ssr: false,
  }
);
/* ---------------------------------- UTILS --------------------------------- */
import { getLeases } from "../../utils/fetch/fetchLease";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Pagination from "@mui/material/Pagination";
import MapIcon from "@mui/icons-material/Map";
import SubjectIcon from "@mui/icons-material/Subject";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const RESULTS_PER_PAGE = 5;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasesPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(true);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const pageCount = useMemo(
    () => Math.ceil(data.totalCount / RESULTS_PER_PAGE),
    [data.totalCount]
  );

  const currentPage = useMemo(
    () => (router.query.page ? +router.query.page : 1),
    [router.query.page]
  );

  const query = useMemo(() => router.query.city, [router.query.city]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Add event listener to compute screen size when viewport changes
   */
  useEffect(() => {
    setInnerWidth();
    window.addEventListener("resize", setInnerWidth);
    return () => window.removeEventListener("resize", setInnerWidth);
  }, []);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onDataPageChange = (event: any, page: number) => {
    const queryParams = router.query;
    queryParams["page"] = String(page);
    const newUrl = Object.entries(queryParams)
      .map((param) => param.join("="))
      .join("&");
    router.push(`/leases?${newUrl}`);
  };

  const setInnerWidth = () => {
    if (window.innerWidth >= 1350) {
      setIsDesktop(true);
      setShowMap(true);
    } else {
      setIsDesktop(false);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>
          Annonces de locations et de sous-locations | lacartedeslogements
        </title>
        <meta
          name="description"
          content="⭐⭐⭐ Découvrez la liste de nos offres immobilières entre particuliers et trouvez un logement à louer ou à sous-louer rapidement et sans frais d'agence"
        />
      </Head>
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
                  {query ? query + " : " : ""}
                  {data.totalCount}{" "}
                  {data.totalCount > 1 ? "logements" : "logement"}
                </Typography>
                {query && (
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
            {data.leases.map((lease: ILease, index: number) => (
              <a
                key={lease.id}
                href={`/leases/${lease.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box sx={{ cursor: "pointer" }}>
                  {index === 0 && (
                    <Divider
                      sx={{
                        "@media (max-width: 760px)": { display: "none" },
                      }}
                    />
                  )}
                  <LeaseCard lease={lease} />
                  <Divider
                    sx={{
                      "@media (max-width: 760px)": { display: "none" },
                    }}
                  />
                </Box>
              </a>
            ))}

            {/** Pagination */}
            {!router.query.lat && data.totalCount > RESULTS_PER_PAGE && (
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
                  <Image
                    src="/img/no-result.svg"
                    alt="no result illustration"
                    width="320"
                    height="220"
                  />
                  <Typography level="h5" fontWeight={400} textAlign="center">
                    {router.query.city &&
                      `Aucun résultat pour ${router.query.city}`}
                    {router.query.latitudes && `Aucun résultat dans cette zone`}
                  </Typography>
                  <Button sx={{ mt: 3 }} onClick={() => router.push("/leases")}>
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
            />
          </Box>

          {!isDesktop && (
            <Box sx={{ position: "absolute", top: 18, right: 48 }}>
              {showMap && (
                <Button
                  onClick={() => setShowMap(false)}
                  startDecorator={<SubjectIcon />}
                  sx={{
                    backgroundColor: "#262626",
                    borderColor: "#262626",
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
                  onClick={() => setShowMap(true)}
                  startDecorator={<MapIcon />}
                  sx={{
                    backgroundColor: "#262626",
                    borderColor: "#262626",
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

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const city = context?.query.city as string;
  const page = context?.query.page as string;
  const latitudes = context?.query.latitudes as string;
  const longitudes = context?.query.longitudes as string;
  const data = await getLeases({ city, latitudes, longitudes, page });
  return {
    props: { data },
  };
};
