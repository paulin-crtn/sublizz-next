/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Button from "@mui/joy/Button";
import styles from "./Signup.module.css";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Signup: React.FC = () => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <Typography level="h4" textAlign="center">
        Inscription
      </Typography>
    </div>
  );
};
