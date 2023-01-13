/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
import Head from "next/head";
/* ------------------------------- COMPONENTS ------------------------------- */
import Signin from "../signin";
import Signup from "../signup";
import ModalLayout from "../modal-layout";
import ResetPasswordAsk from "../reset-password-ask";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import HttpsIcon from "@mui/icons-material/Https";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccessDenied = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openPasswordReset, setOpenPasswordReset] = useState<boolean>(false);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const switchSignModal = () => {
    setOpenSignup((openSignup) => !openSignup);
  };

  const switchToPasswordReset = () => {
    setOpenPasswordReset(true);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>Vous devez vous identifier | lacartedeslogements</title>
      </Head>
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
            <HttpsIcon sx={{ margin: "auto", fontSize: "2.5rem" }} />
          </Box>
          <Typography component="h1" level="h3" marginBottom={0.5}>
            Vous devez vous identifier
          </Typography>
          <Typography
            component="h2"
            level="h5"
            fontWeight={300}
            marginBottom={4}
          >
            L'accès à cette page est restreint
          </Typography>
          <Signin
            switchSignModal={switchSignModal}
            switchToPasswordReset={switchToPasswordReset}
          />
        </Box>
      </Box>

      {/** Signup */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signup">
          <ModalClose />
          <ModalLayout title="Créer un compte">
            <Signup setOpenSignup={setOpenSignup} />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Password Reset */}
      <Modal
        open={openPasswordReset}
        onClose={() => setOpenPasswordReset(false)}
      >
        <ModalDialog size="lg" aria-labelledby="close-modal-password-reset">
          <ModalClose />
          <ModalLayout title="Réinitialiser le mot de passe">
            <ResetPasswordAsk setOpenPasswordReset={setOpenPasswordReset} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AccessDenied;
