/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
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
        <li>Publier une annonce</li>
      </ul>
    </nav>
  );
};
