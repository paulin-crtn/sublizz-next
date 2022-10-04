/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Button from "@mui/joy/Button";
import styles from "./Signin.module.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Signin: React.FC = () => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <Typography level="h4" textAlign="center" marginBottom={3}>
        Connexion
      </Typography>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <FormControl>
        <FormLabel>Mot de passe</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <Button>Se connecter</Button>
    </div>
  );
};
