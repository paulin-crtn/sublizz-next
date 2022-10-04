/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { PropsWithChildren } from "react";
import { Navbar, Footer } from "../index";
import styles from "./Layout.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
