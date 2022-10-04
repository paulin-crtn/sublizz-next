/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { PropsWithChildren } from "react";
import Avatar from "@mui/joy/Avatar";
import styles from "./AccountLayout.module.css";
import Button from "@mui/joy/Button";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ title: string }>;

export const AccountLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Avatar variant="solid" />
        <p>Bernard</p>
        <nav>
          <ul>
            <li>
              <Link href="/user/leases">Annonces</Link>
            </li>
            <li>
              <Link href="/user/profile">Profil</Link>
            </li>
            <li>
              <Link href="/user/account">Compte</Link>
            </li>
            <li>Déconnexion</li>
          </ul>
        </nav>
      </div>
      <div className={styles.content}>
        <h4>{title}</h4>
        <div>{children}</div>
      </div>
    </div>
  );
};
