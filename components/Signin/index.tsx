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
import Divider from "@mui/joy/Divider";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Signin = ({
  setOpenSignin,
  setOpenSignup,
}: {
  setOpenSignin: (arg: boolean) => void;
  setOpenSignup: (arg: boolean) => void;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- FUNCTIONS ------------------------------- */
  function switchSignModal() {
    setOpenSignup(true);
    setOpenSignin(false);
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <Typography level="h4" textAlign="center">
        Connexion
      </Typography>

      <Divider sx={{ my: 3 }} />

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <FormControl>
        <FormLabel>Mot de passe</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <Button>Se connecter</Button>

      <Typography level="body2" marginTop={4}>
        Pas encore de compte ?{" "}
        <Typography
          sx={{ cursor: "pointer" }}
          borderBottom={1}
          onClick={switchSignModal}
        >
          S'inscrire
        </Typography>
      </Typography>
    </div>
  );
};
