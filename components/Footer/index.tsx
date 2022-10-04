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
      <Typography level="h6">Shortloc</Typography>
      <p>
        Sublizz est un service de mise en relation pour les particuliers qui
        souhaitent sous-louer ou mettre à disposition un logement pour une
        courte ou moyenne durée afin de favoriser la mobilité et permettre à
        chacun de réaliser ses projets personnels ou professionnels
      </p>
      <p>Mentions légales & CGU | Politique de confidentialité & Cookies</p>
      <p>© 2022 Sublizz</p>
    </footer>
  );
};
