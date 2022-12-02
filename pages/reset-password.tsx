/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/future/image";
import Head from "next/head";
/* ---------------------------------- UTILS --------------------------------- */
import { resetPassword } from "../utils/fetch/fetchAuth";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import ErrorIcon from "@mui/icons-material/Error";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
/* ------------------------------- INTERFACES ------------------------------- */
import { IResetPaswwordForm } from "../interfaces/IResetPasswordForm";
/* -------------------------------- CONSTANTS ------------------------------- */
import resetPasswordImg from "../public/img/reset-password.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ResetPassword: NextPage = () => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (payload: IResetPaswwordForm) => resetPassword(payload)
  );

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<IResetPaswwordForm>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<IResetPaswwordForm> = async (payload) => {
    const { email, token } = router.query;
    mutate({
      password: payload.password,
      email: email as string,
      token: token as string,
    });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>Réinitialiser votre mot de passe | lacartedeslogements</title>
        <meta
          name="description"
          content="Réinitialiser le mot de passe de votre compte la carte des logements."
        />
      </Head>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={22}
        minHeight="calc(100vh - 90px)"
        padding={4}
        sx={{
          "@media (max-width: 950px)": {
            display: "block",
            minHeight: "auto",
            marginY: "50px",
          },
        }}
      >
        <Box
          flex="0 0"
          sx={{ "@media (max-width: 950px)": { display: "none" } }}
        >
          <Image
            src={resetPasswordImg}
            alt="reset password illustration"
            loading="lazy"
            width={320}
          />
        </Box>
        <Box flex="0 1 500px">
          <Typography level="h4" marginBottom={4}>
            Choisissez un nouveau mot de passe
          </Typography>
          {isSuccess && (
            <Alert color="success" startDecorator={<CheckCircleIcon />}>
              Votre nouveau mot de passe est défini.
            </Alert>
          )}
          {!isSuccess && (
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

              <FormControl error={!!errors.password}>
                <FormLabel>Nouveau mot de passe</FormLabel>
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

              {!isLoading && (
                <Button fullWidth type="submit">
                  Définir ce nouveau mot de passe
                </Button>
              )}
              {isLoading && (
                <Button fullWidth disabled>
                  <CircularProgress />
                </Button>
              )}
            </form>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
