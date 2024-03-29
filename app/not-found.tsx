"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
export default function NotFound() {
  /* --------------------------------- ROUTER --------------------------------- */
  const pathname = usePathname();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [title, setTitle] = useState<string>("La page demandée n'existe pas");

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    if (pathname) {
      const pathArr: string[] = pathname.split("/");
      pathArr[1] === "leases" && pathArr.length === 3
        ? setTitle("L'annonce a été supprimée ou n'existe pas")
        : setTitle("La page demandée n'existe pas");
    } else {
      setTitle("La page demandée n'existe pas");
    }
  }, [pathname]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={16}
      minHeight="calc(100vh - 90px)"
      padding={4}
    >
      <Box flex="0 0" sx={{ "@media (max-width: 950px)": { display: "none" } }}>
        <Image
          src={notFoundImg}
          alt="page not found illustration"
          loading="lazy"
          width={260}
          height={260}
        />
      </Box>
      <Box flex="0 1 500px">
        <Typography component="h1" level="h3" marginBottom={4} lineHeight={1.4}>
          {title}
        </Typography>
        <Link href="/leases">
          <Button color="info" size="lg" startDecorator={<SearchIcon />}>
            Parcourir les annonces
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
