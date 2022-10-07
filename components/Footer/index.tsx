/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Typography } from "@mui/joy";
import styles from "./Footer.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Footer: React.FC = () => {
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
        <Typography fontWeight={200} sx={{ color: "#ffffff" }}>
          Sublizz est un service de mise en relation entre des propriétaires qui
          souhaitent mettre à disposition un logement pour une courte ou moyenne
          durée et des locataires à la recherche d'une location ou d'une
          sous-location temporaire. L'objectif est de favoriser la mobilité et
          de permettre à chacun de réaliser ses projets personnels ou
          professionnels.
        </Typography>
        <Typography
          fontWeight={400}
          marginTop={2}
          marginBottom={2}
          sx={{ color: "#ffffff" }}
        >
          Mentions légales &#x26; CGU &#x2022; Politique de confidentialité
          &#x26; Cookies
        </Typography>
        <Typography fontWeight={600} sx={{ color: "#ffffff" }}>
          © 2022 Sublizz
        </Typography>
      </div>
    </footer>
  );
};
