"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Link from "next/link";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { useLeaseFavorites } from "../../../utils/react-query/lease-favorites";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseCard from "../../shared/lease-card";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
import LeaseSkeleton from "../components/lease-skeleton";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
/* ------------------------------- INTERFACES ------------------------------- */
import { IFavorite } from "../../../interfaces/IFavorite";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const {
    data: favorites,
    isLoading,
    isError,
    error,
  } = useLeaseFavorites(user);

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Favoris" />
        </Box>
        <LeaseSkeleton />
      </>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Favoris" />
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

  if (!favorites.length) {
    return (
      <>
        <Box marginBottom={4}>
          <CustomBreadcrumbs currentPage="Favoris" />
        </Box>
        <Box
          sx={{
            paddingX: 2,
            paddingY: 6,
            textAlign: "center",
            border: "1px solid #272930", // JoyUI
            borderRadius: "12px",
          }}
        >
          <Typography level="h6" fontWeight={400} marginBottom={3}>
            Vous n'avez aucune annonce dans vos favoris.
          </Typography>
          <Link href="/leases">
            <Button variant="soft" startDecorator={<SearchIcon />}>
              Parcourir les annonces
            </Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box marginBottom={4}>
        <CustomBreadcrumbs currentPage="Favoris" />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          "@media (max-width: 1420px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media (max-width: 1150px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {favorites.map((leaseFavorite: IFavorite) => (
          <LeaseCard key={leaseFavorite.id} lease={leaseFavorite.lease} />
        ))}
      </Box>
    </>
  );
}
