/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useState } from "react";
import Image from "next/image";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseDates from "../lease-dates";
import LeaseChips from "../lease-chips";
import FavoriteButton from "../favorite-button";
import ModalLayout from "../modal-layout";
import Signin from "../signin";
import Signup from "../signup";
import SignAlert from "../sign-alert";
import ResetPasswordAsk from "../reset-password-ask";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import noLeaseImg from "../../../public/img/no-lease-img.png";
import { LEASE_IMAGE_PATH } from "../../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseCard: FunctionComponent<{ lease: ILease }> = ({ lease }) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openSignAlert, setOpenSignAlert] = useState<boolean>(false);
  const [openPasswordReset, setOpenPasswordReset] = useState<boolean>(false);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const switchSignModal = () => {
    setOpenSignup((openSignup) => !openSignup);
    setOpenSignin((openSignin) => !openSignin);
  };

  const switchToPasswordReset = () => {
    setOpenSignin(false);
    setOpenPasswordReset(true);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Card
        variant="outlined"
        sx={{ position: "relative", zIndex: 1, cursor: "pointer" }}
      >
        <CardOverflow>
          <AspectRatio ratio="1.8">
            <Image
              src={
                lease.leaseImages && lease.leaseImages[0]
                  ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                  : noLeaseImg
              }
              alt="lease image"
              fill={true}
              style={{ objectFit: "cover" }}
              sizes={"600px"}
            />
          </AspectRatio>
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
          >
            <FavoriteButton
              size="md"
              leaseId={lease.id}
              setOpenSignAlert={setOpenSignAlert}
            />
          </Box>
        </CardOverflow>

        <CardContent sx={{ marginY: 3 }}>
          {/** Nested link : https://www.youtube.com/watch?v=UtEyKP0njm4 */}
          <a href={`/leases/${lease.id}`} target="_blank" rel="noreferrer">
            <Typography level="h5" fontWeight="600" mb={2}>
              {lease.city}
            </Typography>
            <span
              aria-hidden="true"
              style={{ position: "absolute", inset: 0 }}
            ></span>
          </a>
          <LeaseChips lease={lease} size="sm" />
          <Typography level="h5" fontWeight="300" mt={2}>
            {lease.pricePerMonth}€ CC
          </Typography>
        </CardContent>

        <CardOverflow
          variant="soft"
          sx={{
            py: 1.5,
            bgcolor: "background.level1",
          }}
        >
          <LeaseDates lease={lease} withDecorator={true} />
        </CardOverflow>
      </Card>

      {/** Signin */}
      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signin">
          <ModalClose />
          <ModalLayout title="Se connecter">
            <Signin
              setOpenSignin={setOpenSignin}
              switchSignModal={switchSignModal}
              switchToPasswordReset={switchToPasswordReset}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Signup */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signup">
          <ModalClose />
          <ModalLayout title="Créer un compte">
            <Signup
              setOpenSignup={setOpenSignup}
              switchSignModal={switchSignModal}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Sign Alert */}
      <Modal open={openSignAlert} onClose={() => setOpenSignAlert(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-sign-alert">
          <ModalClose />
          <ModalLayout title="Vous devez vous identifier">
            <SignAlert
              setOpenSignAlert={setOpenSignAlert}
              setOpenSignin={setOpenSignin}
              setOpenSignup={setOpenSignup}
            />
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

export default LeaseCard;
