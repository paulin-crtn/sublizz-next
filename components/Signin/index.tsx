/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
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
import { useAuth } from "../../context/auth.context";
import { useAlert } from "../../context/alert.context";
import { customFetch } from "../../utils/customFetch";
import { signin } from "../../utils/fetchAuth";
import handleServerError from "../../utils/setServerError";
import ISignin from "../../interfaces/ISignin";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Signin = ({
  setOpenSignin,
  switchSignModal,
  switchToPasswordReset,
  signCallback,
  setSignCallback,
}: {
  setOpenSignin: Dispatch<SetStateAction<boolean>>;
  switchSignModal: () => void;
  switchToPasswordReset: () => void;
  signCallback: (() => any) | undefined;
  setSignCallback: Dispatch<SetStateAction<(() => any) | undefined>>;
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();
  const { success } = useAlert();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<ISignin>({
    mode: "onTouched",
  });
  const { errors, isSubmitting } = formState;

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<ISignin> = async (payload) => {
    setServerErrors([]);
    try {
      const data = await signin(payload);
      if (data.statusCode && data.statusCode != 200) {
        handleServerError(data.message, setServerErrors);
      } else {
        localStorage.setItem("sublizz", data.access_token);
        const user = await customFetch("users/me", "GET");
        setUser(user);
        success("Bienvenue " + user.firstName);
        signCallback?.();
        setSignCallback(undefined);
        setOpenSignin(false);
      }
    } catch (error) {
      handleServerError(error, setServerErrors);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!serverErrors.length &&
        serverErrors.map((error: string, index: number) => (
          <Alert
            key={index}
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        ))}

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

      {!isSubmitting && (
        <Button fullWidth type="submit">
          Se connecter
        </Button>
      )}
      {isSubmitting && (
        <Button
          fullWidth
          disabled
          startDecorator={<CircularProgress color="danger" thickness={3} />}
        />
      )}

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
