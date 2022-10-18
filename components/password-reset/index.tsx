/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import { resetPassword } from "../../utils/fetchAuth";
import ISignin from "../../interfaces/ISignin";
import SuccessAnimation from "../success-animation";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const PasswordReset = ({
  setOpenPasswordReset,
}: {
  setOpenPasswordReset: Dispatch<SetStateAction<boolean>>;
}) => {
  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: { email: string }) => resetPassword(payload)
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
            Confirmez votre adresse email
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

      {!isLoading && (
        <Button fullWidth type="submit">
          Réinitialiser le mot de passe
        </Button>
      )}
      {isLoading && (
        <Button
          fullWidth
          disabled
          startDecorator={<CircularProgress color="danger" thickness={3} />}
        />
      )}
    </form>
  );
};

export default PasswordReset;
