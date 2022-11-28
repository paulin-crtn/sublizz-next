/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { NextPage } from "next/types";
import Link from "next/link";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Custom500Page: NextPage = () => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" alignItems="stretch" minHeight="calc(100vh - 320px)">
      <Box margin="auto">
        <Typography component="h1" level="h2" marginBottom={1}>
          Erreur 500
        </Typography>
        <Typography component="h2" level="h4" marginBottom={2} fontWeight={300}>
          Une erreur est survenue sur le serveur
        </Typography>
        <Link href="/leases">
          <Button variant="soft" size="lg" startDecorator={<SearchIcon />}>
            Parcourir les annonces
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Custom500Page;
