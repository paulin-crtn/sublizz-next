/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Typography from "@mui/joy/Typography";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import LeaseCard from "../../components/lease-card";
import { ILease } from "../../interfaces/lease";
import styles from "../../styles/Leases.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Leases: NextPage = ({
  leases,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <header>
        <Typography level="h3">Dans quelles villes cherches-tu ?</Typography>
      </header>

      <main>
        <Typography level="h4">
          {leases.length} {leases.length > 1 ? "annonces" : "annonce"}
        </Typography>
        <div className={styles.leases}>
          {leases.map((lease: ILease) => (
            <Link href={`/leases/${lease.id}`} key={lease.id}>
              <div className={styles.lease}>
                <LeaseCard lease={lease} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Leases;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/leases`);
  const leases: ILease[] = await response.json();
  return {
    props: { leases },
  };
};
