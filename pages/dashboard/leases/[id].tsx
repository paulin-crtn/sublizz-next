/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import AccessDenied from "../../../components/access-denied";
import ErrorIcon from "@mui/icons-material/Error";
import AccountLayout from "../../../components/account-layout";
import EditLease from "../../../components/edit-lease";
import { useAuth } from "../../../context/auth.context";
import { getLease } from "../../../utils/fetch/fetchLease";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLeasePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const { id } = router.query;

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["userLease"],
    () => getLease(id),
    {
      enabled: !!id,
      cacheTime: 0,
      retry: false,
    }
  );

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <CircularProgress size="lg" color="neutral" />
          </Box>
        </Box>
      </AccountLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
        {error.message.split(",").map((msg, index) => (
          <Alert
            key={index}
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        ))}
      </AccountLayout>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
        <EditLease lease={data} />
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
      <Link
        key="edit-lease"
        underline="none"
        color="neutral"
        fontSize="inherit"
        fontWeight="300"
        href="/dashboard/leases"
      >
        Mes Annonces
      </Link>
      <Typography fontSize="inherit" fontWeight={500}>
        Modifier
      </Typography>
    </Breadcrumbs>
  );
};
