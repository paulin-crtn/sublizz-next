/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import dynamic from "next/dynamic";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import InputCitySearch from "../../components/input-city-search";
import LeaseCard from "../../components/lease-card";
import { ILease } from "../../interfaces/lease";
import styles from "../../styles/Leases.module.css";

/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(() => import("../../components/lease-map"), {
  ssr: false,
});

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasesPage: NextPage = ({
  leases,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <main>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box flex="1 1 50%">
          <Typography level="h3" mb={2}>
            Dans quelle ville cherchez-vous ?
          </Typography>
          <InputCitySearch withClearSearch={true} />
          <Typography level="h4">
            {leases.length} {leases.length > 1 ? "annonces" : "annonce"}
          </Typography>
          {leases.map((lease: ILease) => (
            <Link href={`/leases/${lease.id}`} key={lease.id}>
              <Box mb={2} sx={{ cursor: "pointer" }}>
                <LeaseCard lease={lease} />
              </Box>
            </Link>
          ))}
        </Box>
        <Box
          flex="0 0 50%"
          // sx={{
          //   zIndex: 1,
          //   position: "fixed",
          //   top: "120px",
          //   right: "30px",
          //   height: "120px",
          //   width: "50%",
          // }}
        >
          <LeaseMapWithNoSSR leases={leases} />
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const city = context?.query.city;
  const response = city
    ? await fetch(`${API_URL}/leases?city=${city}`)
    : await fetch(`${API_URL}/leases`);
  const leases: ILease[] = await response.json();
  return {
    props: { leases },
  };
};
