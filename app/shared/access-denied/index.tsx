/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
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
/* -------------------------------- CONSTANTS ------------------------------- */
import accessDeniedImg from "../../../public/img/access-denied.png";

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
            src={accessDeniedImg}
            alt="authentication required illustration"
            loading="lazy"
            width={300}
            height={300}
          />
        </Box>
        <Box flex="0 1 500px">
          <Box marginBottom={4}>
            <Typography component="h1" level="h3" marginBottom={1}>
              Vous devez vous identifier
            </Typography>
            <Typography component="h2" level="h5" fontWeight={300}>
              L'accès à cette page est restreint
            </Typography>
          </Box>
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
