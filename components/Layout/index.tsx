/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { PropsWithChildren } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import styles from "./layout.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
