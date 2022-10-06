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
import FormHelperText from "@mui/joy/FormHelperText";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Signin = ({
  switchSignModal,
  switchToPasswordReset,
}: {
  switchSignModal: () => void;
  switchToPasswordReset: () => void;
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
        <FormHelperText
          onClick={switchToPasswordReset}
          sx={{ cursor: "pointer" }}
        >
          Mot de passe oublié
        </FormHelperText>
      </FormControl>

      <Button fullWidth sx={{ mt: 2 }}>
        Se connecter
      </Button>

      <Typography
        level="body2"
        marginTop={2}
        textAlign="center"
        sx={{ cursor: "pointer" }}
        onClick={switchSignModal}
      >
        Pas encore de compte ? Créer un compte
      </Typography>
    </>
  );
};
