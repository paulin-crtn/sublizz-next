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
import Image from "next/image";
import { useMemo, useState } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseCard from "../../components/lease-card";
import Divider from "@mui/joy/Divider";
/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(() => import("../../components/lease-map"), {
  ssr: false,
});
/* ---------------------------------- UTILS --------------------------------- */
import { getLeases } from "../../utils/fetch/fetchLease";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Pagination from "@mui/material/Pagination";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../interfaces/lease";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Button from "@mui/joy/Button";

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
  const [show, setShow] = useState<string>("Afficher la carte");

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

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onDataPageChange = (event: any, page: number) => {
    router.push("leases?page=" + page);
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
        }}
      >
        {!!data.totalCount && (
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
            <RadioGroup
              row
              aria-labelledby="segmented-controls-example"
              name="justify"
              value={show}
              onChange={(event) => setShow(event.target.value)}
              sx={{
                minHeight: 48,
                padding: "4px",
                borderRadius: "md",
                bgcolor: "neutral.softBg",
                "--RadioGroup-gap": "4px",
                "--Radio-action-radius": "8px",
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
                  }}
                  componentsProps={{
                    action: ({ checked }) => ({
                      sx: {
                        ...(checked && {
                          bgcolor: "background.surface",
                          boxShadow: "md",
                          borderRadius: "md",
                          "&:hover": {
                            bgcolor: "background.surface",
                          },
                        }),
                      },
                    }),
                  }}
                />
              ))}
            </RadioGroup>
          </Box>
        )}

        {/** LIST & MAP DESKTOP */}
        {/** List */}
        {!!data.totalCount && (
          <Box display="flex" gap={6} sx={{ position: "relative" }}>
            <Box
              flex="1 1 52%"
              sx={{ "@media (max-width: 1400px)": { display: "none" } }}
            >
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
                "@media (max-width: 1400px)": { display: "none" },
              }}
            >
              <LeaseMapWithNoSSR leases={data.leases} isMultiple={true} />
            </Box>
          </Box>
        )}

        {/** LIST & MAP MOBILE */}
        {/** List */}
        {show === "Afficher la liste" && !!data.totalCount && (
          <Box sx={{ "@media (min-width: 1401px)": { display: "none" } }}>
            {data.leases.map((lease: ILease, index: number) => (
              <Link href={`/leases/${lease.id}`} key={lease.id}>
                <Box sx={{ cursor: "pointer" }}>
                  {index === 0 && (
                    <Divider
                      sx={{
                        "@media (max-width: 820px)": { display: "none" },
                      }}
                    />
                  )}
                  <LeaseCard lease={lease} />
                  <Divider
                    sx={{
                      "@media (max-width: 820px)": { display: "none" },
                    }}
                  />
                </Box>
              </Link>
            ))}
          </Box>
        )}
        {/** Map */}
        {show === "Afficher la carte" && !!data.totalCount && (
          <Box
            sx={{
              height: "calc(100vh - 280px)",
              "@media (min-width: 1401px)": { display: "none" },
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
            sx={{ width: "fit-content", mt: 3 }}
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
              <Image src="/img/no-result.svg" width="320" height="220" />
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
  const data = await getLeases({ city, page });
  return {
    props: { data },
  };
};
