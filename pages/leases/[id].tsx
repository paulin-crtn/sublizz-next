/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import format from "date-fns/format";

/* -------------------------------- COMPONENT ------------------------------- */
import { useAuth } from "../../context/auth.context";
import LeaseChips from "../../components/lease-chips";
import ModalLayout from "../../components/modal-layout";
import SendMessage from "../../components/send-message";
import SendReport from "../../components/send-report";
import Signin from "../../components/signin";
import SignAlert from "../../components/sign-alert";
import Signup from "../../components/signup";

/* -------------------------------- INTERFACE ------------------------------- */
import { ILeaseDetail, ILeaseImage } from "../../interfaces/lease";

/* -------------------------------- MUI ICONS ------------------------------- */
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";

/* --------------------------------- MUI JOY -------------------------------- */
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";

/* --------------------------------- STYLES --------------------------------- */
import styles from "../../styles/Lease.module.css";

/* -------------------------------- CONSTANT -------------------------------- */
import {
  LEASE_IMAGE_PATH,
  PROFILE_PICTURE_PATH,
} from "../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasePage: NextPage = ({
  lease,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openSignAlert, setOpenSignAlert] = useState<boolean>(false);
  const [signCallback, setSignCallback] = useState<() => any>();

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const switchSignModal = () => {
    setOpenSignup((openSignup) => !openSignup);
    setOpenSignin((openSignin) => !openSignin);
  };

  const switchToPasswordReset = () => {
    setOpenSignin(false);
  };

  const handleContact = () => {
    if (user) {
      setOpenMessage(true);
    } else {
      setSignCallback(() => () => setOpenMessage(true));
      setOpenSignAlert(true);
    }
  };

  const handleReport = () => {
    if (user) {
      setOpenReport(true);
    } else {
      setSignCallback(() => () => setOpenReport(true));
      setOpenSignAlert(true);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <header className={styles.header}>
        <div>
          <Typography component="h1" level="h3">
            {lease.city}
          </Typography>

          <div className={styles.dates}>
            {!lease.endDate && (
              <Typography level="h5" fontWeight={300}>
                À partir du {format(new Date(lease.startDate), "dd MMMM uuuu")}
              </Typography>
            )}

            {lease.endDate && (
              <Typography level="h5" fontWeight={300}>
                Du {format(new Date(lease.startDate), "dd MMMM uuuu")} au{" "}
                {format(new Date(lease.endDate), "dd MMMM uuuu")}
              </Typography>
            )}

            {!!lease.isDateFlexible && (
              <Chip color="neutral" variant="soft" sx={{ fontWeight: 400 }}>
                Dates flexibles
              </Chip>
            )}
          </div>

          <LeaseChips lease={lease} />
        </div>

        <div>
          <Typography level="h4" fontWeight={400}>
            {lease.pricePerMonth}€ CC
          </Typography>
        </div>
      </header>

      <main>
        <Box
          component="ul"
          sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3, mb: 6 }}
        >
          {lease.leaseImages.map((image: string, index: number) => (
            <Card
              key={index}
              component="li"
              sx={{ flexGrow: 1, height: 250, maxWidth: 400 }}
            >
              <CardCover>
                <Image
                  src={LEASE_IMAGE_PATH + "/" + image}
                  layout="fill"
                  priority={true}
                />
              </CardCover>
            </Card>
          ))}
        </Box>

        <div className={styles.wrapper}>
          <div>
            <Typography level="h6" fontWeight={300}>
              {lease.description}
            </Typography>
            <div className={styles.author}>
              <Avatar
                alt="Photo de profil de l'auteur de l'annonce"
                src={
                  lease.user.profilePictureName
                    ? PROFILE_PICTURE_PATH + "/" + lease.user.profilePictureName
                    : undefined
                }
                sx={{
                  width: 80,
                  height: 80,
                  mr: 2,
                }}
              />
              <div>
                <Typography fontWeight={300}>
                  Annonce publiée le{" "}
                  {format(new Date(lease.createdAt), "dd LLLL uuuu")}
                  <br />
                  par{" "}
                  <Typography fontWeight={500}>
                    {lease.user.firstName}
                  </Typography>
                </Typography>
              </div>
            </div>
          </div>
          <div className={styles.cta}>
            <Button startDecorator={<EmailIcon />} onClick={handleContact}>
              Contacter {lease.user.firstName}
            </Button>
            <Button
              startDecorator={<FlagIcon />}
              onClick={handleReport}
              variant="outlined"
            >
              Signaler l'annonce
            </Button>
          </div>
        </div>
      </main>

      {/** Contact author */}
      <Modal open={openMessage} onClose={() => setOpenMessage(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-contact">
          <ModalClose />
          <ModalLayout title={`Contacter ${lease.user.firstName}`}>
            <SendMessage lease={lease} setOpenMessage={setOpenMessage} />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Report lease */}
      <Modal open={openReport} onClose={() => setOpenReport(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-report">
          <ModalClose />
          <ModalLayout title="Signaler l'annonce">
            <SendReport leaseId={lease.id} setOpenReport={setOpenReport} />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Signin */}
      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signin">
          <ModalClose />
          <ModalLayout title="Se connecter">
            <Signin
              setOpenSignin={setOpenSignin}
              switchSignModal={switchSignModal}
              switchToPasswordReset={switchToPasswordReset}
              signCallback={signCallback}
              setSignCallback={setSignCallback}
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
          <ModalLayout title="Identifiez-vous pour continuer">
            <SignAlert
              setOpenSignAlert={setOpenSignAlert}
              setOpenSignin={setOpenSignin}
              setOpenSignup={setOpenSignup}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default LeasePage;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const id = context?.params?.id;
  const response = await fetch(`${API_URL}/leases/${id}`);
  const lease: ILeaseDetail = await response.json();
  return {
    props: { lease },
  };
};
