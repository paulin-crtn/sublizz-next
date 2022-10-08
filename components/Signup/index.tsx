/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
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

/* -------------------------------------------------------------------------- */
/*                                 INTERFACES                                 */
/* -------------------------------------------------------------------------- */
interface IFormInputs {
  firstName: string;
  email: string;
  password: string;
  consent: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Signup = ({ switchSignModal }: { switchSignModal: () => void }) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [isConsent, setIsConsent] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, setValue } = useForm<IFormInputs>({
    mode: "onTouched",
  });
  const { errors, isSubmitting } = formState;

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    setValue("consent", isConsent);
  }, [isConsent, setValue]);

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<IFormInputs> = async (payload) => {
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.statusCode && data.statusCode != 201) {
        handleServerError(data.message);
      }
    } catch (error) {
      console.log(error);
      handleServerError(error);
    }
  };

  const handleServerError = (error: unknown) => {
    if (error instanceof Error) {
      setServerErrors([error.message]);
    } else if (error instanceof Array) {
      setServerErrors(error);
    } else if (typeof error === "string") {
      setServerErrors([error]);
    } else {
      setServerErrors(["Server error"]);
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

      <FormControl>
        <FormLabel>Prénom</FormLabel>
        <Input type="text" variant="soft" {...register("firstName")} />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" variant="soft" {...register("email")} />
      </FormControl>

      <FormControl>
        <FormLabel>Mot de passe</FormLabel>
        <Input type="password" variant="soft" {...register("password")} />
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
              onChange={(event) => setIsConsent(event.target.checked)}
              variant="solid"
              sx={{ mr: 2 }}
            />
          }
          sx={{ alignItems: "flex-start" }}
        >
          <div>
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
          </div>
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
