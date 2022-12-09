"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
/* ---------------------------------- UTILS --------------------------------- */
import { useAuth } from "../../../../utils/context/auth.context";
import { getLease } from "../../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import AccessDenied from "../../../../components/public/access-denied";
import DashboardLayout from "../../../../components/dashboard/dashboard-layout";
import EditLease from "../../../../components/dashboard/edit-lease";
import CustomBreadcrumbs from "../../../../components/dashboard/custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import ErrorIcon from "@mui/icons-material/Error";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const pathname = usePathname();

  /* -------------------------------- CONSTANTS ------------------------------- */
  const prevPages = [
    {
      key: "new-lease",
      name: "Gérer mes annonces",
      href: "/dashboard/leases",
    },
  ];

  /* ------------------------------- REACT MEMO ------------------------------- */
  const id = useMemo(() => {
    if (pathname) {
      const pathnameArr = pathname.split("/");
      return pathnameArr[pathnameArr.length - 1];
    }
    return null;
  }, [pathname]);

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["userLease", id],
    () => getLease(Number(id) as number),
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
}
