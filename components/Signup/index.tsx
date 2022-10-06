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
export const Signup = ({
  switchSignModal,
}: {
  switchSignModal: () => void;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Typography level="h4" textAlign="center">
        Créer un compte
      </Typography>

      <Divider sx={{ my: 3 }} />

      <FormControl>
        <FormLabel>Prénom</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <FormControl>
        <FormLabel>Mot de passe</FormLabel>
        <Input variant="soft" />
      </FormControl>

      <Button>Créer un compte</Button>

      <Typography level="body2" marginTop={4}>
        Déjà un compte ?{" "}
        <Typography
          sx={{ cursor: "pointer" }}
          borderBottom={1}
          onClick={switchSignModal}
        >
          Se connecter
        </Typography>
      </Typography>
    </>
  );
};
