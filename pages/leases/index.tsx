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
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { useEffect, useMemo, useState } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseCard from "../../components/public/lease-card";
import Divider from "@mui/joy/Divider";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
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
  const [showMapOrList, setShowMapOrList] =
    useState<string>("Afficher la carte");
  const [showDesktopMap, setShowDesktopMap] = useState<boolean>(false);

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
    router.push("leases?page=" + page);
  };

  const setInnerWidth = () => {
    setShowDesktopMap(window.innerWidth >= 1400);
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
      <Box
        component="main"
        sx={{
          paddingX: 6,
          paddingTop: 4,
          marginBottom: "90px",
          "@media (max-width: 800px)": {
            paddingX: 4,
            paddingTop: 2,
            marginBottom: "60px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
            "@media (max-width: 800px)": { display: "inline-block" },
          }}
        >
          <Box>
            <Typography fontWeight={500}>
              {query ? query + " : " : ""}
              {data.totalCount} {data.totalCount > 1 ? "logements" : "logement"}
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
          <RadioGroup
            row
            name="mapOrList"
            size="sm"
            value={showMapOrList}
            onChange={(event) => setShowMapOrList(event.target.value)}
            sx={{
              minHeight: 48,
              padding: "4px",
              borderRadius: "md",
              bgcolor: "#262626",
              "--RadioGroup-gap": "4px",
              "@media (min-width: 1400px)": { display: "none" },
              "@media (max-width: 800px)": { marginTop: 3 },
            }}
          >
            {["Afficher la carte", "Afficher la liste"].map((item) => (
              <Radio
                key={item}
                color="neutral"
                value={item}
                disableIcon
                label={item}
                variant="plain"
                sx={{
                  px: 2,
                  alignItems: "center",
                  color: "#ffffff",
                }}
                componentsProps={{
                  action: ({ checked }) => ({
                    sx: {
                      "&:hover": {
                        bgcolor: "#474747",
                        borderRadius: "md",
                      },
                      "&:active": {
                        bgcolor: "#474747",
                        borderRadius: "md",
                      },
                      ...(checked && {
                        bgcolor: "#474747",
                        borderRadius: "md",
                        "&:hover": {
                          bgcolor: "#474747",
                        },
                      }),
                    },
                  }),
                }}
              />
            ))}
          </RadioGroup>
        </Box>

        {/** LIST & MAP DESKTOP */}
        {/** List */}
        {showDesktopMap && (
          <Box display="flex" gap={6} sx={{ position: "relative" }}>
            <Box flex="1 1 52%">
              {data.leases.map((lease: ILease, index: number) => (
                <Link href={`/leases/${lease.id}`} key={lease.id}>
                  <Box sx={{ cursor: "pointer" }}>
                    {index === 0 && <Divider />}
                    <LeaseCard lease={lease} />
                    <Divider />
                  </Box>
                </Link>
              ))}
            </Box>
            {/** Map */}
            <Box
              flex="0 1 48%"
              sx={{
                position: "sticky",
                top: 148,
                alignSelf: "flex-start",
                height: "calc(100vh - 200px)",
              }}
            >
              <LeaseMapWithNoSSR leases={data.leases} isMultiple={true} />
            </Box>
          </Box>
        )}

        {/** LIST & MAP MOBILE */}
        {/** List */}
        {showMapOrList === "Afficher la liste" &&
          !!data.totalCount &&
          !showDesktopMap && (
            <Box>
              {data.leases.map((lease: ILease, index: number) => (
                <Link href={`/leases/${lease.id}`} key={lease.id}>
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
                </Link>
              ))}
            </Box>
          )}
        {/** Map */}
        {showMapOrList === "Afficher la carte" && !showDesktopMap && (
          <Box
            sx={{
              height: "calc(100vh - 300px)",
            }}
          >
            <LeaseMapWithNoSSR leases={data.leases} isMultiple={true} />
          </Box>
        )}

        {/** Pagination */}
        {data.totalCount > RESULTS_PER_PAGE && (
          <Pagination
            count={pageCount}
            size="large"
            sx={{ width: "fit-content", mt: 4 }}
            onChange={onDataPageChange}
            page={currentPage}
          />
        )}

        {/** No result */}
        {!data.totalCount && (
          <Box
            sx={{
              display: "flex",
              height: "calc(100vh - 300px)",
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
                Aucun résultat
              </Typography>
              {query && (
                <Button sx={{ mt: 3 }} onClick={() => router.push("/leases")}>
                  Effacer la recherche
                </Button>
              )}
            </Box>
          </Box>
        )}
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
  const lat = context?.query.lat as string;
  const lng = context?.query.lng as string;
  const data = await getLeases({ city, lat, lng, page });
  return {
    props: { data },
  };
};
