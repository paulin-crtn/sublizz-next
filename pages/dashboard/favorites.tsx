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
import { useFavorite } from "../../context/favorite.context";
import { IFavorite } from "../../interfaces/IFavorite";
import LeaseFavorite from "../../components/lease-favorite";
import CustomBreadcrumbs from "../../components/custom-beadcrumbs";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseFavoritesPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { favorites } = useFavorite();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!favorites.length) {
    return (
      <AccountLayout
        pageTitle="Favoris"
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
      </AccountLayout>
    );
  }

  return (
    <AccountLayout
      pageTitle="Favoris"
      breadcrumbs={<CustomBreadcrumbs currentPage="Favoris" />}
    >
      {favorites.map((leaseFavorite: IFavorite, index: number) => (
        <Box key={leaseFavorite.id}>
          {index === 0 && <Divider />}
          <LeaseFavorite leaseFavorite={leaseFavorite} />
          <Divider />
        </Box>
      ))}
    </AccountLayout>
  );
};

export default LeaseFavoritesPage;
