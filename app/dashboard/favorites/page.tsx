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
import AccessDenied from "../../shared/access-denied";
import LeaseCard from "../../shared/lease-card";
import DashboardLayout from "../components/dashboard-layout";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
import LeaseSkeleton from "../components/lease-skeleton";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/joy/Divider";
/* ------------------------------- INTERFACES ------------------------------- */
import { IFavorite } from "../../../interfaces/IFavorite";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { data: favorites, isLoading } = useLeaseFavorites(user);

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <DashboardLayout
        breadcrumbs={<CustomBreadcrumbs currentPage="Favoris" />}
      >
        <LeaseSkeleton />
      </DashboardLayout>
    );
  }

  if (!favorites.length) {
    return (
      <DashboardLayout
        breadcrumbs={<CustomBreadcrumbs currentPage="Favoris" />}
      >
        <Box sx={{ marginX: "auto", marginY: 6, textAlign: "center" }}>
          <Typography level="h6" fontWeight={400} marginBottom={3}>
            Vous n'avez aucune annonce dans vos favoris.
          </Typography>
          <Link href="/leases">
            <Button variant="soft" startDecorator={<SearchIcon />}>
              Parcourir les annonces
            </Button>
          </Link>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumbs={<CustomBreadcrumbs currentPage="Favoris" />}>
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
    </DashboardLayout>
  );
}
