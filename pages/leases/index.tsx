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
import { useMemo } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import InputCitySearch from "../../components/input-city-search";
import LeaseCard from "../../components/lease-card";
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
const RESULTS_PER_PAGE = 2;

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

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onDataPageChange = (event: any, page: number) => {
    router.push("leases?page=" + page);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <main>
      <Box sx={{ display: "flex", gap: 4, height: "calc(100vh - 160px)" }}>
        <Box flex="1 1 50%" sx={{ overflowY: "scroll" }}>
          <Typography level="h3" mb={2}>
            Dans quelle ville cherchez-vous ?
          </Typography>
          <InputCitySearch withClearSearch={true} />
          <Typography level="h4">
            {data.totalCount} {data.totalCount > 1 ? "annonces" : "annonce"}
          </Typography>
          {data.leases.map((lease: ILease) => (
            <Link href={`/leases/${lease.id}`} key={lease.id}>
              <Box mb={2} sx={{ cursor: "pointer" }}>
                <LeaseCard lease={lease} />
              </Box>
            </Link>
          ))}
          <Pagination
            count={pageCount}
            sx={{ mt: 3, textAlign: "center" }}
            onChange={onDataPageChange}
            page={currentPage}
          />
        </Box>
        <Box flex="0 0 50%">
          <LeaseMapWithNoSSR leases={data.leases} isMultiple={true} />
        </Box>
      </Box>
    </main>
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
