"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Image from "next/image";
/* ---------------------------------- UTILS --------------------------------- */
import { confirmEmail } from "../../utils/fetch/fetchAuth";
/* ------------------------------- COMPONENTS ------------------------------- */
import Signin from "../shared/signin";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConfirmEmail } from "../../interfaces/IConfirmEmail";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const payload: { emailVerificationId: string; token: string } | null =
    useMemo(() => {
      const emailVerificationId = searchParams.get("emailVerificationId");
      const token = searchParams.get("token");
      if (emailVerificationId && token) {
        return {
          emailVerificationId: emailVerificationId as string,
          token: token as string,
        };
      }
      return null;
    }, [searchParams]);

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    ["confirm-email", payload],
    () => confirmEmail(payload as IConfirmEmail),
    { enabled: !!payload }
  );

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
          <SafetyCheckIcon sx={{ margin: "auto", fontSize: "2.5rem" }} />
        </Box>
        <Typography component="h1" level="h3" marginBottom={0.5}>
          Validation de l'adresse email
        </Typography>
        <Typography component="h2" level="h5" fontWeight={300} marginBottom={4}>
          Un instant, on vérifie que c'est bien vous
        </Typography>
        {isLoading && (
          <Box textAlign="center">
            <CircularProgress color="info" />
          </Box>
        )}
        {isSuccess && (
          <>
            <Alert
              color="success"
              startDecorator={<CheckCircleIcon />}
              sx={{ marginBottom: 3 }}
            >
              Votre email {data.email} est confirmé.
            </Alert>
            <Signin
              signCallback={() => {
                router.push("/dashboard");
              }}
            />
          </>
        )}
        {isError && error instanceof Error && (
          <Alert color="danger" startDecorator={<ErrorIcon />}>
            {error.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
