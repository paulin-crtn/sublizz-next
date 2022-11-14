/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";
import SuccessAnimation from "../success-animation";
import { IHelpUsFom } from "../../interfaces/IHelpUsForm";
import { storeHelpUsMessage } from "../../utils/fetch/fetchHelpUs";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const HelpUs = ({
  setOpenHelp,
}: {
  setOpenHelp: Dispatch<SetStateAction<boolean>>;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [message, setMessage] = useState<string>("");

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: IHelpUsFom) => storeHelpUsMessage(payload)
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ message });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isSuccess) {
    return (
      <>
        <SuccessAnimation />
        <Box textAlign="center" marginBottom={4}>
          <Typography level="h5" marginBottom={2}>
            Merci pour votre suggestion.
          </Typography>
          <Typography>Notre équipe l'étudiera avec attention 🙂</Typography>
        </Box>
        <Button variant="solid" fullWidth onClick={() => setOpenHelp(false)}>
          Fermer
        </Button>
      </>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {isError && error instanceof Error && (
        <Alert
          startDecorator={<ErrorIcon />}
          variant="soft"
          color="danger"
          sx={{ mb: 2 }}
        >
          {error.message}
        </Alert>
      )}

      <FormControl>
        <Typography mb={1} fontWeight={500}>
          Suggestion d'amélioration ou bug sur le site ?
        </Typography>
        <Typography mb={2} fontWeight={300}>
          Aidez-nous à améliorer notre service en décrivant le plus précisément
          possible votre demande ou le problème rencontré.
        </Typography>

        <Textarea
          variant="soft"
          minRows={6}
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>
      {!isLoading && (
        <Button fullWidth type="submit">
          Envoyer votre suggestion
        </Button>
      )}
      {isLoading && (
        <Button
          fullWidth
          disabled
          startDecorator={<CircularProgress thickness={3} />}
        />
      )}
    </form>
  );
};

export default HelpUs;
