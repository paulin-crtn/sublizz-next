/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMemo } from "react";
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
    <Box
      component="main"
      sx={{
        position: "relative",
        display: "flex",
        gap: 6,
        padding: 6,
        marginBottom: "90px",
      }}
    >
      <Box flex="1 1 52%">
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
        {!!data.totalCount && (
          <Box mt={2}>
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
        )}
        {data.totalCount > RESULTS_PER_PAGE && (
          <Pagination
            count={pageCount}
            sx={{ width: "fit-content", mt: 3, mx: "auto" }}
            onChange={onDataPageChange}
            page={currentPage}
          />
        )}
        {!data.totalCount && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100% - 50px)",
            }}
          >
            <Image src="/img/no-result.svg" width="450" height="450" />
          </Box>
        )}
      </Box>

      {/** Map */}
      {!!data.totalCount && (
        <Box
          flex="0 0 48%"
          sx={{
            alignSelf: "flex-start",
            position: "sticky",
            top: 135, // 90px height navbar + 45px container marginTop
          }}
        >
          <LeaseMapWithNoSSR leases={data.leases} isMultiple={true} />
        </Box>
      )}
      {!data.totalCount && (
        <Box
          flex="0 0 48%"
          sx={{
            height: "calc(100vh - 160px)",
            backgroundColor: "#eeeeee",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        ></Box>
      )}
    </Box>
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
