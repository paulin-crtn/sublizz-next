/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../context/auth.context";
import AccessDenied from "../../components/access-denied";
import AccountLayout from "../../components/account-layout";
import Divider from "@mui/joy/Divider";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { FavoriteProvider, useFavorite } from "../../context/favorite.context";
import { IFavorite } from "../../interfaces/IFavorite";
import LeaseFavorite from "../../components/lease-favorite";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseFavoritesPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <FavoriteProvider user={user}>
      <LeaseFavorites />
    </FavoriteProvider>
  );
};

export default LeaseFavoritesPage;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseFavorites = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { leaseFavorites } = useFavorite();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!leaseFavorites.length) {
    return (
      <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
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
      </AccountLayout>
    );
  }

  return (
    <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
      {leaseFavorites.map((leaseFavorite: IFavorite, index: number) => (
        <Box key={leaseFavorite.id}>
          {index === 0 && <Divider />}
          <LeaseFavorite leaseFavorite={leaseFavorite} />
          <Divider />
        </Box>
      ))}
    </AccountLayout>
  );
};

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const BasicBreadcrumbs = () => {
  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumbs"
      sx={{ fontSize: "1.6rem" }}
    >
      <Typography fontSize="inherit" fontWeight={500}>
        Mes favoris
      </Typography>
    </Breadcrumbs>
  );
};
