/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Image from "next/image";
import Head from "next/head";
/* ---------------------------------- UTILS --------------------------------- */
import { confirmEmail } from "../utils/fetch/fetchAuth";
/* ------------------------------- COMPONENTS ------------------------------- */
import Signin from "../components/public/signin";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConfirmEmail } from "../interfaces/IConfirmEmail";
/* -------------------------------- CONSTANTS ------------------------------- */
import confirmEmailImg from "../public/img/confirm-email.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ConfirmEmailPage: NextPage = () => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const payload: { emailVerificationId: string; token: string } | null =
    useMemo(() => {
      const { emailVerificationId, token } = router.query;
      if (emailVerificationId && token) {
        return {
          emailVerificationId: emailVerificationId as string,
          token: token as string,
        };
      }
      return null;
    }, [router.query]);

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    ["confirm-email", payload],
    () => confirmEmail(payload as IConfirmEmail),
    { enabled: !!payload }
  );

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>Confirmation de votre email | lacartedeslogements</title>
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
            src={confirmEmailImg}
            alt="email confirmation illustration"
            loading="lazy"
            width={300}
            height={300}
          />
        </Box>
        <Box flex="0 1 500px">
          {isLoading && (
            <Box textAlign="center">
              <CircularProgress size="lg" thickness={6} />
              <Typography marginTop={4}>Vérification en cours</Typography>
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
    </>
  );
};

export default ConfirmEmailPage;
