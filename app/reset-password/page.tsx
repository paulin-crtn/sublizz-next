"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
/* ---------------------------------- UTILS --------------------------------- */
import { resetPassword } from "../../utils/fetch/fetchAuth";
/* ------------------------------- COMPONENTS ------------------------------- */
import LoadingIndicator from "../shared/loading-indicator";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import ErrorIcon from "@mui/icons-material/Error";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoopIcon from "@mui/icons-material/Loop";
/* ------------------------------- INTERFACES ------------------------------- */
import { IResetPaswwordForm } from "../../interfaces/IResetPasswordForm";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- ROUTER --------------------------------- */
  const searchParams = useSearchParams();

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
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    mutate({
      password: payload.password,
      email: email as string,
      token: token as string,
    });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
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
        marginBottom={4}
        sx={(theme) => ({
          position: "relative",
          maxWidth: 700,
          paddingX: 10,
          paddingY: 4,
          backgroundColor: theme.colorSchemes.dark.palette.background.surface,
          borderRadius: "16px",
        })}
      >
        <Box
          sx={(theme) => ({
            position: "absolute",
            display: "flex",
            top: "-15px",
            left: "-15px",
            padding: 1,
            backgroundColor: theme.colorSchemes.dark.palette.neutral[700],
            borderRadius: "8px",
          })}
        >
          <LoopIcon sx={{ margin: "auto", fontSize: "2.5rem" }} />
        </Box>
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
                sx={{ mb: 4 }}
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

            <Button
              className="btn-primary-gradient"
              loading={isLoading}
              loadingIndicator={<LoadingIndicator />}
              fullWidth
              type="submit"
            >
              Définir ce nouveau mot de passe
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
}
