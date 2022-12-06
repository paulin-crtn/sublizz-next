/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
/* -------------------------------- CONSTANTS ------------------------------- */
import notFoundImg from "../public/img/not-found.png";

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
  }, [router.asPath]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>Erreur 404 | lacartedeslogements</title>
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
            src={notFoundImg}
            alt="page not found illustration"
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
            {title}
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

export default Custom404Page;
