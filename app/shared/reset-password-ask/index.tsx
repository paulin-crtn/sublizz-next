/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
/* ---------------------------------- UTILS --------------------------------- */
import { askResetPassword } from "../../../utils/fetch/fetchAuth";
/* ------------------------------- COMPONENTS ------------------------------- */
import SuccessAnimation from "../success-animation";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import ErrorIcon from "@mui/icons-material/Error";
/* ------------------------------- INTERFACES ------------------------------- */
import ISignin from "../../../interfaces/ISignin";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ResetPasswordAsk = ({
  setOpenPasswordReset,
}: {
  setOpenPasswordReset: Dispatch<SetStateAction<boolean>>;
}) => {
  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: { email: string }) => askResetPassword(payload)
  );

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<ISignin>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<ISignin> = async (payload) => {
    mutate(payload);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isSuccess) {
    return (
      <>
        <SuccessAnimation />
        <Box textAlign="center" marginBottom={4}>
          <Typography level="h5" marginBottom={2}>
            Demande envoyée
          </Typography>
          <Typography>
            Nous vous avons envoyé un email afin de changer votre mot de passe.
          </Typography>
        </Box>
        <Button
          variant="solid"
          fullWidth
          onClick={() => setOpenPasswordReset(false)}
        >
          C'est compris
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

      <FormControl error={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          variant="soft"
          {...register("email", {
            required: "Ce champs est requis",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Vous devez renseigner une adresse email valide",
            },
          })}
        />
        {errors.email && (
          <FormHelperText>{errors.email.message}</FormHelperText>
        )}
      </FormControl>

      <Button loading={isLoading} fullWidth type="submit">
        Réinitialiser le mot de passe
      </Button>
    </form>
  );
};

export default ResetPasswordAsk;
