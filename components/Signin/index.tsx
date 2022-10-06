/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Signin = ({
  switchSignModal,
}: {
  switchSignModal: () => void;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Typography level="h4" textAlign="center">
        Se connecter
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
          Créer un compte
        </Typography>
      </Typography>
    </>
  );
};
