"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
/* ---------------------------------- UTILS --------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
import { getUserLeases } from "../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import AccessDenied from "../../shared/access-denied";
import DashboardLayout from "../components/dashboard-layout";
import DashboardLeaseCard from "./components/dashboard-lease-card";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
import LeaseSkeleton from "../components/lease-skeleton";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import Alert from "@mui/joy/Alert";
import Divider from "@mui/joy/Divider";
import ErrorIcon from "@mui/icons-material/Error";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const {
    isLoading,
    isError,
    data: userLeases,
    error,
  } = useQuery(["userLeases"], getUserLeases, {
    enabled: !!user,
    initialData: [],
  });

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <DashboardLayout
        breadcrumbs={<CustomBreadcrumbs currentPage="Gérer mes annonces" />}
      >
        <LeaseSkeleton />
      </DashboardLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <DashboardLayout
        breadcrumbs={<CustomBreadcrumbs currentPage="Gérer mes annonces" />}
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

  if (!userLeases.length) {
    return (
      <DashboardLayout
        breadcrumbs={<CustomBreadcrumbs currentPage="Gérer mes annonces" />}
      >
        <Box sx={{ marginX: "auto", marginY: 6, textAlign: "center" }}>
          <Typography level="h6" fontWeight={400} marginBottom={3}>
            Vous n'avez publié aucune annonce.
          </Typography>
          <Link href="/dashboard/leases/new">
            <Button variant="soft" startDecorator={<Add />}>
              Publier une annonce
            </Button>
          </Link>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      breadcrumbs={<CustomBreadcrumbs currentPage="Gérer mes annonces" />}
    >
      {userLeases.map((lease: ILeaseDetail, index: number) => (
        <Box key={lease.id}>
          {index === 0 && <Divider />}
          <DashboardLeaseCard lease={lease} />
          <Divider />
        </Box>
      ))}
    </DashboardLayout>
  );
}
