"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
/* ---------------------------------- UTILS --------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
import { getUserLeases } from "../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import DashboardLeaseCard from "./components/dashboard-lease-card";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
import LeaseSkeleton from "../../shared/lease-skeleton";
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

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <>
        <CustomBreadcrumbsWithCTA />
        <LeaseSkeleton />
      </>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <>
        <CustomBreadcrumbsWithCTA />
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

  if (!userLeases.length) {
    return (
      <>
        <CustomBreadcrumbsWithCTA />
        <Box
          sx={(theme) => ({
            paddingX: 2,
            paddingY: 6,
            textAlign: "center",
            border: "1px solid",
            borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
            borderRadius: "12px",
          })}
        >
          <Typography level="h6" fontWeight={400} marginBottom={3}>
            Vous n'avez publié aucune annonce.
          </Typography>
          <Link href="/dashboard/leases/new">
            <Button variant="soft" startDecorator={<Add />}>
              Publier une annonce
            </Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <CustomBreadcrumbsWithCTA />
      {userLeases.map((lease: ILeaseDetail, index: number) => (
        <Box key={lease.id}>
          {index === 0 && <Divider />}
          <DashboardLeaseCard lease={lease} />
          <Divider />
        </Box>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomBreadcrumbsWithCTA = () => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={4}
    >
      <CustomBreadcrumbs currentPage="Gérer mes annonces" />
      <Button
        variant="soft"
        startDecorator={<Add />}
        onClick={() => {
          router.push("/dashboard/leases/new");
        }}
      >
        Publier une annonce
      </Button>
    </Box>
  );
};
