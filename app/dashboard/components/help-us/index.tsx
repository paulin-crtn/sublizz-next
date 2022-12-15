/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
/* ---------------------------------- UTILS --------------------------------- */
import { storeHelpUsMessage } from "../../../../utils/fetch/fetchHelpUs";
/* ------------------------------- COMPONENTS ------------------------------- */
import SuccessAnimation from "../../../shared/success-animation";
import LoadingIndicator from "../../../shared/loading-indicator";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";
import FormHelperText from "@mui/joy/FormHelperText";
/* ------------------------------- INTERFACES ------------------------------- */
import { IHelpUsForm } from "../../../../interfaces/IHelpUsForm";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const HelpUs = ({
  setOpenHelp,
}: {
  setOpenHelp: Dispatch<SetStateAction<boolean>>;
}) => {
  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<IHelpUsForm>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: IHelpUsForm) => storeHelpUsMessage(payload)
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onSubmit: SubmitHandler<IHelpUsForm> = async (payload) => {
    mutate(payload);
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
          <Typography>
            Nous allons en prendre connaissance avec attention.
          </Typography>
        </Box>
        <Button variant="solid" fullWidth onClick={() => setOpenHelp(false)}>
          Fermer
        </Button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <FormControl error={!!errors.message}>
        <Textarea
          variant="soft"
          minRows={6}
          maxRows={6}
          placeholder="Partagez une suggestion d'amélioration ou un bug rencontré..."
          {...register("message", {
            required: "Ce champs est requis",
            maxLength: {
              value: 2000,
              message: "2000 caractères maximum",
            },
          })}
        />
        {errors.message && (
          <FormHelperText>{errors.message.message}</FormHelperText>
        )}
      </FormControl>

      <Button
        loading={isLoading}
        loadingIndicator={<LoadingIndicator />}
        fullWidth
        type="submit"
      >
        Envoyer votre suggestion
      </Button>
    </form>
  );
};

export default HelpUs;
