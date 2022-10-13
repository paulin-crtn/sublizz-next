/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/joy/CircularProgress";
import FormHelperText from "@mui/joy/FormHelperText";
import Box from "@mui/joy/Box";
import SuccessAnimation from "../success-animation";
import handleServerError from "../../utils/setServerError";
import ISignup from "../../interfaces/signup";
import { signup } from "../../utils/fetchAuth";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Signup = ({
  setOpenSignup,
  switchSignModal,
}: {
  setOpenSignup: Dispatch<SetStateAction<boolean>>;
  switchSignModal: () => void;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [isConsent, setIsConsent] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, setValue } = useForm<ISignup>({
    mode: "onTouched",
  });
  const { errors, isSubmitting } = formState;

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    setValue("consent", isConsent);
  }, [isConsent, setValue]);

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<ISignup> = async (payload) => {
    setServerErrors([]);
    try {
      const data = await signup(payload);
      data.statusCode && data.statusCode != 201
        ? handleServerError(data.message, setServerErrors)
        : setIsSignupSuccess(true);
    } catch (error) {
      handleServerError(error, setServerErrors);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isSignupSuccess) {
    return (
      <>
        <SuccessAnimation />
        <Box textAlign="center" marginBottom={4}>
          <Typography level="h5" marginBottom={1}>
            Confirmez votre adresse email
          </Typography>
          <Typography>
            Nous vous avons envoyé un email afin de confirmer votre adresse et
            activer votre compte.
          </Typography>
        </Box>
        <Button variant="solid" fullWidth onClick={() => setOpenSignup(false)}>
          C'est compris
        </Button>
      </>
    );
  }
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

      <FormControl error={!!errors.firstName}>
        <FormLabel>Prénom</FormLabel>
        <Input
          type="text"
          variant="soft"
          {...register("firstName", {
            required: "Ce champs est requis",
            minLength: {
              value: 3,
              message: "3 caractères minimum",
            },
            maxLength: {
              value: 30,
              message: "30 caractères maximum",
            },
          })}
        />
        {errors.firstName && (
          <FormHelperText>{errors.firstName.message}</FormHelperText>
        )}
      </FormControl>

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
      </FormControl>

      <FormControl>
        <Typography
          component="div"
          fontSize="0.9rem"
          fontWeight={300}
          lineHeight={1.8}
          startDecorator={
            <Switch
              checked={isConsent}
              {...register("consent", {
                required: "Vous devez accepter pour continuer",
              })}
              onChange={(event) => setIsConsent(event.target.checked)}
              variant="solid"
            />
          }
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ ml: 2 }}>
            {errors.consent && (
              <Typography display="block" color="danger">
                {errors.consent.message}
              </Typography>
            )}
            <Typography>
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
            </Typography>
          </Box>
        </Typography>
      </FormControl>

      {!isSubmitting && (
        <Button fullWidth type="submit">
          Créer un compte
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
        Déjà un compte ? Se connecter
      </Typography>
    </form>
  );
};

export default Signup;
