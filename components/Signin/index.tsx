/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                                 INTERFACES                                 */
/* -------------------------------------------------------------------------- */
interface IFormInputs {
  email: string;
  password: string;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Signin = ({
  switchSignModal,
  switchToPasswordReset,
}: {
  switchSignModal: () => void;
  switchToPasswordReset: () => void;
}) => {
  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<IFormInputs>({
    mode: "onTouched",
  });
  const { errors, isSubmitting } = formState;

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  console.log(errors);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <FormControl error={!!errors.password}>
        <FormLabel>Mot de passe</FormLabel>
        <Input
          type="password"
          variant="soft"
          {...register("password", {
            required: "Ce champs est requis",
            minLength: {
              value: 8,
              message: "8 caractères minimum",
            },
            maxLength: {
              value: 20,
              message: "20 caractères maximum",
            },
          })}
        />
        {errors.password && (
          <FormHelperText>{errors.password.message}</FormHelperText>
        )}
        <Typography
          level="body2"
          onClick={switchToPasswordReset}
          marginTop={1}
          sx={{ width: "fit-content", cursor: "pointer" }}
        >
          Mot de passe oublié
        </Typography>
      </FormControl>

      <Button fullWidth type="submit" disabled={isSubmitting}>
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
    </form>
  );
};

export default Signin;
