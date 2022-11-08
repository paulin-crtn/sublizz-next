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
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import CustomBreadcrumbs from "../../../components/custom-beadcrumbs";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLeasePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const { id } = router.query;

  /* -------------------------------- CONSTANTS ------------------------------- */
  const prevPages = [
    {
      key: "new-lease",
      name: "Mes Annonces",
      href: "/dashboard/leases",
    },
  ];

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
      <AccountLayout
        breadcrumbs={
          <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
        }
      >
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
      <AccountLayout
        breadcrumbs={
          <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
        }
      >
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
      <AccountLayout
        breadcrumbs={
          <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
        }
      >
        <Box width="65%">
          <EditLease lease={data} />
        </Box>
      </AccountLayout>
    </LocalizationProvider>
  );
};

export default EditLeasePage;
