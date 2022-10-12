/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction } from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const SignAlert = ({
  setOpenSignAlert,
  setOpenSignin,
  setOpenSignup,
}: {
  setOpenSignAlert: Dispatch<SetStateAction<boolean>>;
  setOpenSignup: Dispatch<SetStateAction<boolean>>;
  setOpenSignin: Dispatch<SetStateAction<boolean>>;
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Typography level="h6" textAlign="center" marginTop={2} marginBottom={4}>
        Vous devez vous identifier pour continuer
      </Typography>
      <Box textAlign="center" marginBottom={2}>
        <Button
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => {
            setOpenSignin(true);
            setOpenSignAlert(false);
          }}
        >
          Se connecter
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            setOpenSignup(true);
            setOpenSignAlert(false);
          }}
        >
          Créer un compte
        </Button>
      </Box>
    </>
  );
};

export default SignAlert;
