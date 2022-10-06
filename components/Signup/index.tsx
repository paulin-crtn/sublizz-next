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
import Switch from "@mui/joy/Switch";

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

      <FormControl>
        <Typography
          component="div"
          fontSize="0.9rem"
          fontWeight={300}
          lineHeight={1.8}
          startDecorator={<Switch variant="soft" sx={{ mr: 2 }} />}
          sx={{ alignItems: "flex-start" }}
        >
          <div>
            J'accepte les{" "}
            <a target="_blank" href="#">
              Conditions Générales d'Utilisation
            </a>
            , la{" "}
            <a target="_blank" href="#">
              Politique de Confidentialité
            </a>{" "}
            et les{" "}
            <a target="_blank" href="#">
              Mentions Légales
            </a>
          </div>
        </Typography>
      </FormControl>

      <Button fullWidth sx={{ mt: 2 }}>
        Créer un compte
      </Button>

      <Typography
        level="body2"
        marginTop={2}
        textAlign="center"
        sx={{ cursor: "pointer" }}
        onClick={switchSignModal}
      >
        Déjà un compte ? Se connecter
      </Typography>
    </>
  );
};
