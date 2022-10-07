/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { PropsWithChildren } from "react";
import Link from "next/link";
import Avatar from "@mui/joy/Avatar";
import { Typography } from "@mui/joy";
import styles from "./account-layout.module.css";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ title: string }>;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccountLayout: React.FC<Props> = ({ children, title }) => {
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
        <Typography level="h3">{title}</Typography>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
