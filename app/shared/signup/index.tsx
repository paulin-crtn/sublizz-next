/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
/* ---------------------------------- UTILS --------------------------------- */
import { signup } from "../../../utils/fetch/fetchAuth";
/* ------------------------------- COMPONENTS ------------------------------- */
import SuccessAnimation from "../../shared/success-animation";
import LoadingIndicator from "../loading-indicator";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import FormHelperText from "@mui/joy/FormHelperText";
import Box from "@mui/joy/Box";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import ErrorIcon from "@mui/icons-material/Error";
/* ------------------------------- INTERFACES ------------------------------- */
import ISignup from "../../../interfaces/ISignup";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Signup = ({
  setOpenSignup,
  switchSignModal,
}: {
  setOpenSignup: Dispatch<SetStateAction<boolean>>;
  switchSignModal?: () => void;
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
          <Typography marginBottom={1}>
            Nous avons envoyé un email à{" "}
            <Box component="span" fontWeight={600}>
              {getValues("email")}
            </Box>{" "}
            afin de confirmer l'adresse et activer votre compte. <br />
          </Typography>
          <Typography color="danger">
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
                    label="Je propose un logement"
                    value={UserRoleEnum.OWNER}
                    variant="solid"
                    color="primary"
                    disableIcon
                    sx={{
                      textAlign: "center",
                      "& .JoyRadio-input": { position: "initial" },
                    }}
                  />
                  <Radio
                    label="Je cherche un logement"
                    value={UserRoleEnum.SEEKER}
                    variant="soft"
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
              rules={{ required: "Vous devez accepter pour continuer" }}
              defaultValue={false}
              render={({ field: { onChange, ...field } }) => (
                <Switch
                  variant="soft"
                  size="lg"
                  color={watch("consent") === true ? "primary" : "neutral"}
                  onChange={(event) => {
                    onChange(event);
                  }}
                  {...field}
                  sx={{ marginBottom: "auto", mr: 2 }}
                />
              )}
            />
            <Box>
              {errors.consent && (
                <Typography
                  display="block"
                  margin="0 0 5px 0"
                  fontSize="0.85rem"
                  sx={{ color: "#d3232f" }}
                >
                  {errors.consent.message}
                </Typography>
              )}
              <Typography fontSize="0.85rem">
                J'accepte les{" "}
                <a href="/legal/terms-of-service" target="_blank">
                  <Box
                    component="span"
                    fontWeight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    Conditions Générales d'Utilisation
                  </Box>
                </a>
                , la{" "}
                <a href="/legal/privacy-and-cookies" target="_blank">
                  <Box
                    component="span"
                    fontWeight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    Politique de Confidentialité
                  </Box>
                </a>{" "}
                et les{" "}
                <a href="/legal/notice" target="_blank">
                  <Box
                    component="span"
                    fontWeight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    Mentions Légales
                  </Box>
                </a>
              </Typography>
            </Box>
          </FormControl>

          <Button
            loading={isLoading}
            loadingIndicator={<LoadingIndicator />}
            fullWidth
            type="submit"
          >
            Créer un compte
          </Button>
        </Box>
      )}
    </form>
  );
};

export default Signup;
