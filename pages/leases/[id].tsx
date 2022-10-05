/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Typography from "@mui/joy/Typography";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { ILeaseDetail } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Lease: NextPage = ({
  lease,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <Typography level="h3">{lease.city}</Typography>
      <Typography level="h4">
        Du {lease.startDate} au {lease.endDate}
      </Typography>
    </div>
  );
};

export default Lease;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const response = await fetch("http://localhost:4000/leases/" + id);
  const lease: ILeaseDetail = await response.json();
  return {
    props: { lease },
  };
};
