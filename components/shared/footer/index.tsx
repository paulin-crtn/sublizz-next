/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/future/image";
/* ----------------------------------- MUI ---------------------------------- */
import { Box, List, ListItem, Typography } from "@mui/joy";
/* -------------------------------- CONSTANTS ------------------------------- */
import haftwaldImg from "../../../public/img/haftwald.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Footer: FunctionComponent = () => {
  return (
    <Box component="footer" padding={8} sx={{ backgroundColor: "#191919" }}>
      <Typography
        component="h6"
        level="h4"
        marginBottom={4}
        letterSpacing={0}
        sx={{ color: "#ffffff" }}
      >
        lacartedeslogements
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 8,
          "@media (max-width: 1250px)": { display: "block" },
        }}
      >
        <Box sx={{ flex: "1 1" }}>
          <Typography
            fontWeight={200}
            fontSize="0.9rem"
            lineHeight="1.6rem"
            marginBottom={4}
            sx={{ flex: "1 1", color: "#ffffff" }}
          >
            La carte des logements est un service de mise en relation entre des
            propriétaires qui souhaitent mettre à disposition un logement pour
            une courte ou moyenne durée et des locataires à la recherche d'une
            location ou d'une sous-location temporaire. L'objectif est de
            favoriser la mobilité et de permettre à chacun de réaliser ses
            projets personnels ou professionnels.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: "0 1 600px",
            display: "flex",
            gap: 8,
            "@media (max-width: 700px)": { display: "block" },
          }}
        >
          <Box marginBottom={4}>
            <Typography
              id="decorated-list-demo"
              component="h6"
              level="body2"
              fontWeight="lg"
              mb={1}
              sx={{ color: "#ffffff" }}
            >
              Location et sous-location
            </Typography>
            <List size="sm" aria-labelledby="decorated-list-demo">
              <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
                <Link href="/leases">Rechercher une annonce</Link>
              </ListItem>
              <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
                <Link href="/leases">Annonces de location</Link>
              </ListItem>
              <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
                <Link href="/leases">Annonces de sous-location</Link>
              </ListItem>
            </List>
          </Box>

          <Box marginBottom={4}>
            <Typography
              id="decorated-list-demo"
              level="body2"
              fontWeight="lg"
              mb={1}
              sx={{ color: "#ffffff" }}
            >
              Documents légaux
            </Typography>
            <List size="sm" aria-labelledby="decorated-list-demo">
              <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
                <Link href="/legal/notice">Mentions légales</Link>
              </ListItem>
              <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
                <Link href="/legal/terms-of-service">
                  Conditions générales d'utilisation
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
                <Link href="/legal/privacy-and-cookies">
                  Politique de confidentialité &#x26; Cookies
                </Link>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
      <Typography fontWeight={300} fontSize="0.9rem" sx={{ color: "#ffffff" }}>
        © {new Date().getFullYear()}{" "}
        <Box component="span" fontWeight={500}>
          lacartedeslogements
        </Box>{" "}
        par
        <Box component="span" marginLeft="6px" sx={{ cursor: "pointer" }}>
          <a href="https://haftwald.com" target="_blank" rel="noreferrer">
            <Image
              src={haftwaldImg}
              alt="logo du site haftwald, développeur web freelance javascript et typescript react next nest node"
              width={80}
            />
          </a>
        </Box>
      </Typography>
    </Box>
  );
};

export default Footer;
