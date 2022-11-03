/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Link from "next/link";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import EditLease from "../../../components/edit-lease";
import { useAuth } from "../../../context/auth.context";
import { Link as JoyLink } from "@mui/joy";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLeasePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
        <EditLease lease={undefined} />
      </AccountLayout>
    </LocalizationProvider>
  );
};

export default EditLeasePage;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const BasicBreadcrumbs = () => {
  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumbs"
      sx={{ fontSize: "1.6rem" }}
    >
      <JoyLink
        key="Mes Annonces"
        underline="none"
        color="neutral"
        fontSize="inherit"
        fontWeight="300"
      >
        <Link href="/dashboard/leases">Mes Annonces</Link>
      </JoyLink>
      <Typography fontSize="inherit" fontWeight={500}>
        Publier
      </Typography>
    </Breadcrumbs>
  );
};
