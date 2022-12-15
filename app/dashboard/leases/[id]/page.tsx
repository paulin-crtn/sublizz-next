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
import { getLease } from "../../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import EditLease from "../components/edit-lease";
import CustomBreadcrumbs from "../../components/custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import ErrorIcon from "@mui/icons-material/Error";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
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

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
        </Box>
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <CircularProgress size="lg" color="neutral" />
          </Box>
        </Box>
      </>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
        </Box>
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
      </>
    );
  }

  return (
    <>
      <Box marginBottom={4}>
        <CustomBreadcrumbs currentPage="Modifier" prevPages={prevPages} />
      </Box>
      <Box
        width="65%"
        sx={{
          "@media (max-width: 1200px)": { width: "85%" },
          "@media (max-width: 900px)": { width: "100%" },
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={frLocale}
        >
          <EditLease lease={data} />
        </LocalizationProvider>
      </Box>
    </>
  );
}
