"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useQuery } from "@tanstack/react-query";
import frLocale from "date-fns/locale/fr";
/* ---------------------------------- UTILS --------------------------------- */
import { useAuth } from "../../../../utils/context/auth.context";
import { getUserLeases } from "../../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import EditLease from "../components/edit-lease";
import CustomBreadcrumbs from "../../components/custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
import Button from "@mui/joy/Button";
import StyleIcon from "@mui/icons-material/Style";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const {
    data: userLeases,
    isLoading,
    isError,
    error,
  } = useQuery(["userLeases"], getUserLeases, {
    enabled: !!user,
    initialData: [],
  });

  /* -------------------------------- CONSTANT -------------------------------- */
  const prevPages = [
    {
      key: "new-lease",
      name: "Gérer mes annonces",
      href: "/dashboard/leases",
    },
  ];

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Publier" prevPages={prevPages} />
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
          <CustomBreadcrumbs currentPage="Publier" prevPages={prevPages} />
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

  if (userLeases.length >= 2) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Publier" prevPages={prevPages} />
        </Box>
        <Box
          sx={(theme) => ({
            paddingX: 2,
            paddingY: 6,
            textAlign: "center",
            border: "3px solid",
            borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
            borderRadius: "12px",
          })}
        >
          <Typography level="h6" fontWeight={400} marginBottom={1}>
            Vous avez atteint la limite de 2 annonces publiées par compte.
          </Typography>
          <Typography
            level="body2"
            marginBottom={3}
            maxWidth={540}
            marginX="auto"
          >
            Cette limite nous permet de continuer à proposer ce service
            gratuitement et de s'assurer que seul les particuliers publient des
            annonces.
          </Typography>
          <Link href="/dashboard/leases">
            <Button color="info" startDecorator={<StyleIcon />}>
              Lister mes annonces
            </Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box marginBottom={4}>
        <CustomBreadcrumbs currentPage="Publier" prevPages={prevPages} />
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
          <EditLease lease={undefined} />
        </LocalizationProvider>
      </Box>
    </>
  );
}
