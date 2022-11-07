/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
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
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import SuccessAnimation from "../success-animation";
import { signup } from "../../utils/fetch/fetchAuth";
import ISignup from "../../interfaces/ISignup";
import { UserRoleEnum } from "../../enum/UserRoleEnum";

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
  const [stepIndex, setStepIndex] = useState<number>(0);

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, watch, getValues, control } =
    useForm<ISignup>({
      mode: "onTouched",
    });
  const { errors } = formState;

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: ISignup) => signup(payload)
  );

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<ISignup> = async (payload) => {
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
            Nous avons envoyé un email à <strong>{getValues("email")}</strong>{" "}
            afin de confirmer l'adresse et activer votre compte. <br />
            Pensez à vérifier dans vos indésirables.
          </Typography>
        </Box>
        <Button variant="solid" fullWidth onClick={() => setOpenSignup(false)}>
          D'accord
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

      {stepIndex === 0 && (
        <>
          <FormControl>
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <RadioGroup
                  aria-labelledby="account-role-label"
                  {...field}
                  onChange={(event) => {
                    onChange(event);
                    setStepIndex(1);
                  }}
                >
                  <Radio
                    label="Je cherche un logement"
                    value={UserRoleEnum.SEEKER}
                    variant="solid"
                    color="primary"
                    disableIcon
                    sx={{
                      textAlign: "center",
                      "& .JoyRadio-input": { position: "initial" },
                    }}
                  />
                  <Radio
                    label="Je propose un logement"
                    value={UserRoleEnum.OWNER}
                    variant="outlined"
                    color="primary"
                    disableIcon
                    sx={{
                      marginTop: 1,
                      textAlign: "center",
                      "& .JoyRadio-input": { position: "initial" },
                    }}
                  />
                </RadioGroup>
              )}
            />
            {errors.role && (
              <FormHelperText>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
          <Typography
            level="body2"
            marginTop={2}
            textAlign="center"
            sx={{ cursor: "pointer" }}
            onClick={switchSignModal}
          >
            Déjà un compte ? Se connecter
          </Typography>
        </>
      )}

      {stepIndex === 1 && (
        <Box>
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

          <FormControl orientation="horizontal">
            <Controller
              name="consent"
              control={control}
              rules={{ required: "Ce champs est requis" }}
              defaultValue={false}
              render={({ field: { onChange, ...field } }) => (
                <Switch
                  variant="soft"
                  color={watch("consent") === true ? "primary" : "neutral"}
                  onChange={(event) => {
                    onChange(event);
                  }}
                  {...field}
                  sx={{ marginBottom: "auto", mr: 2 }}
                ></Switch>
              )}
            />
            <Box>
              {errors.consent && (
                <Typography
                  display="block"
                  color="danger"
                  margin={0}
                  fontSize="0.9rem"
                >
                  {errors.consent.message}
                </Typography>
              )}
              <Typography fontSize="0.9rem">
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
          </FormControl>

          {!isLoading && (
            <Button fullWidth type="submit">
              Créer un compte
            </Button>
          )}
          {isLoading && (
            <Button fullWidth disabled>
              <CircularProgress color="danger" thickness={3} />
            </Button>
          )}
        </Box>
      )}
    </form>
  );
};

export default Signup;
