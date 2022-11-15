/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import Link from "next/link";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Custom404Page: NextPage = () => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [title, setTitle] = useState<string>("La page demandée n'existe pas");

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const pathArr: string[] = router.asPath.split("/");
    pathArr[1] === "leases" && pathArr.length === 3
      ? setTitle("L'annonce a été supprimée ou n'existe pas")
      : setTitle("La page demandée n'existe pas");
  }, []);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" alignItems="stretch" minHeight="calc(100vh - 320px)">
      <Box margin="auto">
        <Typography component="h1" level="h2" marginBottom={1}>
          {title}
        </Typography>
        <Typography component="h2" level="h4" marginBottom={2} fontWeight={300}>
          Retrouvez le droit chemin en parcourant nos annonces
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

export default Custom404Page;
