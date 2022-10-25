/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import EditLease from "../../../components/edit-lease";
import { useAuth } from "../../../context/auth.context";
import { ILeaseDetail } from "../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLeasePage: NextPage = ({
  lease,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <AccountLayout
        title={lease ? "Modifier une annonce" : "Publier une annonce"}
      >
        <EditLease lease={lease} />
      </AccountLayout>
    </LocalizationProvider>
  );
};

export default EditLeasePage;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async (context) => {
  let lease: ILeaseDetail | null = null;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const id = context?.params?.id;
  if (id && id != "new") {
    const response = await fetch(`${API_URL}/leases/${+id}`);
    lease = await response.json();
  }
  return {
    props: { lease },
  };
};
