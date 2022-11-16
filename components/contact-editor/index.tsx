/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction } from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ContactEditor = ({
  setOpenContactEditor,
}: {
  setOpenContactEditor: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Alert color="neutral" sx={{ width: "100%" }}>
        <Typography>contact</Typography>
        <AlternateEmailIcon sx={{ color: "#000000" }} />
        <Typography>haftwald</Typography>
        <Typography>.</Typography>
        <Typography>com</Typography>
      </Alert>
      <Box
        mt={3}
        sx={{
          color: "text.secondary",
          fontSize: "0.9rem",
        }}
      >
        <Typography fontWeight={500} fontSize="inherit">
          Veuillez joindre à votre message :
        </Typography>
        <Typography mt={1} fontSize="inherit">
          Votre identité, vos coordonnées, le motif ainsi que toute information
          nécessaire au traitement de votre demande.
        </Typography>
      </Box>
      <Button
        fullWidth
        onClick={() => setOpenContactEditor(false)}
        sx={{ mt: 3 }}
      >
        Fermer
      </Button>
    </>
  );
};

export default ContactEditor;
