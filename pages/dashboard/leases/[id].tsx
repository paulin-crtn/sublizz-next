/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import AccessDenied from "../../../components/public/access-denied";
import ErrorIcon from "@mui/icons-material/Error";
import DashboardLayout from "../../../components/dashboard/dashboard-layout";
import EditLease from "../../../components/dashboard/edit-lease";
import { useAuth } from "../../../utils/context/auth.context";
import { getLease } from "../../../utils/fetch/fetchLease";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import CustomBreadcrumbs from "../../../components/dashboard/custom-beadcrumbs";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLeasePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const id = router.query.id as string;

  /* -------------------------------- CONSTANTS ------------------------------- */
  const prevPages = [
    {
      key: "new-lease",
      name: "Gérer mes annonces",
      href: "/dashboard/leases",
    },
  ];

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["userLease"],
    () => getLease(+id),
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
      <DashboardLayout
        pageTitle="Modifier une annonce"
        breadcrumbs={
          <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
        }
      >
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <CircularProgress size="lg" color="neutral" />
          </Box>
        </Box>
      </DashboardLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <DashboardLayout
        pageTitle="Modifier une annonce"
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
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageTitle="Modifier une annonce"
      breadcrumbs={
        <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
      }
    >
      <Box width="65%">
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={frLocale}
        >
          <EditLease lease={data} />
        </LocalizationProvider>
      </Box>
    </DashboardLayout>
  );
};

export default EditLeasePage;
