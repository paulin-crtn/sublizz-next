/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Button from "@mui/joy/Button";
import styles from "./Navbar.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Navbar: React.FC = () => {
  return (
    <nav className={styles.container}>
      <p>Shortloc.com</p>
      <ul>
        <li>Connexion</li>
        <li>Inscription</li>
        <li>
          <Button size="sm">Publier une annonce</Button>
        </li>
      </ul>
    </nav>
  );
};
