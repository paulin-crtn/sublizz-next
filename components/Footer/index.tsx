/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent } from "react";
import Link from "next/link";
import { Box, List, ListItem, Typography } from "@mui/joy";

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
        sx={{ color: "#ffffff" }}
      >
        lacartedeslogements
      </Typography>
      <Box sx={{ display: "flex", gap: 8 }}>
        <Box sx={{ flex: "1 1" }}>
          <Typography
            fontWeight={200}
            fontSize="0.9rem"
            lineHeight="1.6rem"
            sx={{ flex: "1 1", color: "#ffffff" }}
          >
            La carte des logements est un service de mise en relation entre des
            propriétaires qui souhaitent mettre à disposition un logement pour
            une courte ou moyenne durée et des locataires à la recherche d'une
            location ou d'une sous-location temporaire. L'objectif est de
            favoriser la mobilité et de permettre à chacun de réaliser ses
            projets personnels ou professionnels.
          </Typography>
          <Typography fontSize="0.9rem" marginTop={4} sx={{ color: "#ffffff" }}>
            © {new Date().getFullYear()} lacartedeslogements
          </Typography>
        </Box>

        <Box sx={{ flex: "0 1 280px" }}>
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
              <Link href="/leases">Consulter toutes les annonces</Link>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ flex: "0 1 280px" }}>
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
              <Link href="#">Mentions légales</Link>
            </ListItem>
            <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
              <Link href="#">Conditions générales d'utilisation</Link>
            </ListItem>
            <ListItem sx={{ padding: 0, color: "#ffffff", fontWeight: 200 }}>
              <Link href="#">Politique de confidentialité &#x26; Cookies</Link>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
