/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent } from "react";
import { Box, List, ListItem, Typography } from "@mui/joy";
import Link from "next/link";
import styles from "./footer.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <Typography
          component="h6"
          level="h4"
          marginBottom={4}
          sx={{ color: "#ffffff" }}
        >
          ShortLoc
        </Typography>
        <Box sx={{ display: "flex", gap: 8 }}>
          <Box sx={{ flex: "1 1" }}>
            <Typography
              fontWeight={200}
              fontSize="0.9rem"
              lineHeight="1.5rem"
              sx={{ flex: "1 1", color: "#ffffff" }}
            >
              Sublizz est un service de mise en relation entre des propriétaires
              qui souhaitent mettre à disposition un logement pour une courte ou
              moyenne durée et des locataires à la recherche d'une location ou
              d'une sous-location temporaire. L'objectif est de favoriser la
              mobilité et de permettre à chacun de réaliser ses projets
              personnels ou professionnels.
            </Typography>
            <Typography
              fontSize="0.9rem"
              marginTop={4}
              sx={{ color: "#ffffff" }}
            >
              © 2022 Sublizz
            </Typography>
          </Box>

          <Box sx={{ flex: "0 0 300px" }}>
            <Typography
              id="decorated-list-demo"
              component="h6"
              level="body2"
              textTransform="uppercase"
              fontWeight="lg"
              mb={1}
              sx={{ color: "#ffffff" }}
            >
              Location et sous-location
            </Typography>
            <List size="sm" aria-labelledby="decorated-list-demo">
              <ListItem>
                <Link href="/leases">
                  <span className={styles.listItem}>
                    Rechercher une annonce
                  </span>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/leases">
                  <span className={styles.listItem}>
                    Consulter toutes les annonces
                  </span>
                </Link>
              </ListItem>
            </List>
          </Box>

          <Box sx={{ flex: "0 0 300px" }}>
            <Typography
              id="decorated-list-demo"
              level="body2"
              textTransform="uppercase"
              fontWeight="lg"
              mb={1}
              sx={{ color: "#ffffff" }}
            >
              Documents légaux
            </Typography>
            <List size="sm" aria-labelledby="decorated-list-demo">
              <ListItem sx={{ color: "#ffffff", fontWeight: 200 }}>
                Mentions légales &#x26; CGU
              </ListItem>
              <ListItem sx={{ color: "#ffffff", fontWeight: 200 }}>
                Politique de confidentialité &#x26; Cookies
              </ListItem>
            </List>
          </Box>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;
