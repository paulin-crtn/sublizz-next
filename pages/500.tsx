/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { NextPage } from "next/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
/* -------------------------------- CONSTANTS ------------------------------- */
import serverErrorImg from "../public/img/server-error.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Custom500Page: NextPage = () => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>Erreur 500 | lacartedeslogements</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={22}
        minHeight="calc(100vh - 90px)"
        padding={4}
        sx={{
          "@media (max-width: 950px)": {
            display: "block",
            minHeight: "auto",
            marginY: "50px",
          },
        }}
      >
        <Box
          flex="0 0"
          sx={{ "@media (max-width: 950px)": { display: "none" } }}
        >
          <Image
            src={serverErrorImg}
            alt="server error illustration"
            loading="lazy"
            width={300}
            height={300}
          />
        </Box>
        <Box flex="0 1 500px">
          <Typography
            component="h1"
            level="h3"
            marginBottom={4}
            lineHeight={1.4}
          >
            Une erreur est survenue sur le serveur
          </Typography>
          <Link href="/leases">
            <Button variant="soft" size="lg" startDecorator={<SearchIcon />}>
              Parcourir les annonces
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Custom500Page;
