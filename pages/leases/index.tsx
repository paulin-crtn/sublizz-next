/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Typography from "@mui/joy/Typography";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { LeaseCard } from "../../components";
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
    <div>
      <Typography level="h3">Dans quelles villes cherches-tu ?</Typography>
      <Typography level="h4">
        {leases.length} {leases.length > 1 ? "annonces" : "annonce"}
      </Typography>
      <div className={styles.leases}>
        {leases.map((lease: ILease) => (
          <LeaseCard lease={lease} />
        ))}
      </div>
    </div>
  );
};

export default Leases;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:4000/leases");
  const leases = await response.json();
  return {
    props: { leases },
  };
};
