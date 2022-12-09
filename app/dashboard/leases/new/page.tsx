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
import AccessDenied from "../../../../components/public/access-denied";
import DashboardLayout from "../../../../components/dashboard/dashboard-layout";
import EditLease from "../../../../components/dashboard/edit-lease";
import CustomBreadcrumbs from "../../../../components/dashboard/custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
import Button from "@mui/joy/Button";
import StyleIcon from "@mui/icons-material/Style";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const { data: userLeases } = useQuery(["userLeases"], getUserLeases, {
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

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (userLeases.length >= 2) {
    return (
      <DashboardLayout
        breadcrumbs={
          <CustomBreadcrumbs currentPage="Publier" prevPages={prevPages} />
        }
      >
        <Box sx={{ marginX: "auto", marginY: 6, textAlign: "center" }}>
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
            <Button variant="soft" startDecorator={<StyleIcon />}>
              Lister mes annonces
            </Button>
          </Link>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      breadcrumbs={
        <CustomBreadcrumbs currentPage="Publier" prevPages={prevPages} />
      }
    >
      <Box width="65%">
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={frLocale}
        >
          <EditLease lease={undefined} />
        </LocalizationProvider>
      </Box>
    </DashboardLayout>
  );
}
