/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Button from "@mui/joy/Button";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Signup = ({ switchSignModal }: { switchSignModal: () => void }) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
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
          startDecorator={<Switch variant="solid" sx={{ mr: 2 }} />}
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

      <Button fullWidth>Créer un compte</Button>

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

export default Signup;
