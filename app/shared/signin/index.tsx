/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { signin } from "../../../utils/fetch/fetchAuth";
import { getAuthUser } from "../../../utils/fetch/fetchUser";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
/* ------------------------------- INTERFACES ------------------------------- */
import ISignin from "../../../interfaces/ISignin";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../../const/toastStyle";

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
  setOpenSignin?: Dispatch<SetStateAction<boolean>>;
  switchSignModal?: () => void;
  switchToPasswordReset?: () => void;
  signCallback?: (() => any) | undefined;
  setSignCallback?: Dispatch<SetStateAction<(() => any) | undefined>>;
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error } = useMutation(
    (payload: ISignin) => signin(payload),
    {
      onSuccess: async (data) => {
        localStorage.setItem(
          "lacartesdeslogements_access_token",
          data.access_token
        );
        const user = await getAuthUser();
        setUser(user);
        toast.success(`Bon retour parmi nous ${user?.firstName}`, {
          style: TOAST_STYLE,
        });
        signCallback?.();
        setSignCallback ? setSignCallback(undefined) : null;
        if (setOpenSignin) {
          setOpenSignin(false);
        }
      },
    }
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

      {!isLoading && (
        <Button fullWidth type="submit">
          Se connecter
        </Button>
      )}
      {isLoading && (
        <Button fullWidth disabled>
          <CircularProgress />
        </Button>
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
