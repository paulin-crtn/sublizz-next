/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMemo, useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import format from "date-fns/format";
import dynamic from "next/dynamic";
import { ImagesListType } from "react-spring-lightbox";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import { getLease } from "../../utils/fetch/fetchLease";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* -------------------------------- COMPONENT ------------------------------- */
import LeaseChips from "../../components/lease-chips";
import ModalLayout from "../../components/modal-layout";
import SendMessage from "../../components/send-message";
import SendReport from "../../components/send-report";
import Signin from "../../components/signin";
import SignAlert from "../../components/sign-alert";
import Signup from "../../components/signup";
import LeaseLightbox from "../../components/lease-lightbox";
import FavoriteButton from "../../components/favorite-button";
import LeaseDates from "../../components/lease-dates";
/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(() => import("../../components/lease-map"), {
  ssr: false,
});
/* -------------------------------- MUI ICONS ------------------------------- */
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
/* --------------------------------- MUI JOY -------------------------------- */
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Button from "@mui/joy/Button";
/* -------------------------------- CONSTANT -------------------------------- */
import { UserRoleEnum } from "../../enum/UserRoleEnum";
import { TOAST_STYLE } from "../../const/toastStyle";
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
  const [openLightbox, setOpenLightbox] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openSignAlert, setOpenSignAlert] = useState<boolean>(false);
  const [signCallback, setSignCallback] = useState<() => any>();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const lightboxImages: ImagesListType = useMemo(
    () =>
      lease.leaseImages.map((name: string) => ({
        src: LEASE_IMAGE_PATH + "/" + name,
        loading: "lazy",
      })),
    [lease]
  );

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
      if (user.role === UserRoleEnum.SEEKER) {
        setOpenMessage(true);
      } else {
        toast.error(
          "Action reservée aux utilisateurs à la recherche d'un logement",
          { style: TOAST_STYLE }
        );
      }
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
      <Box component="header" display="flex" justifyContent="space-between">
        <Box>
          <Typography component="h1" level="h2">
            {lease.city}
          </Typography>
          <LeaseDates lease={lease} isMinimized={false} />
          <LeaseChips lease={lease} />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography level="h3" fontWeight={200}>
            {lease.pricePerMonth}€ CC
          </Typography>
          {/** Favorite */}
          <FavoriteButton
            leaseId={lease.id}
            setOpenSignAlert={setOpenSignAlert}
          />
        </Box>
      </Box>

      <main>
        {lease.leaseImages && !!lease.leaseImages.length && (
          <Box
            component="ul"
            sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}
          >
            {lease.leaseImages.map((image: string, index: number) => (
              <Card
                key={index}
                component="li"
                sx={{
                  flexGrow: 1,
                  height: 250,
                  boxShadow: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setOpenLightbox(true);
                }}
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
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 6,
            marginTop: 6,
            marginBottom: 4,
          }}
        >
          <Box sx={{ flex: "1 1" }}>
            <Typography level="h4" marginBottom={3}>
              Description
            </Typography>
            <Typography level="h6" fontWeight={300} marginBottom={3}>
              {lease.description}
            </Typography>
            <FormHelperText sx={{ marginBottom: 1 }}>
              Annonce publiée le{" "}
              {format(new Date(lease.createdAt), "dd LLLL uuuu")}
            </FormHelperText>
            <Button
              startDecorator={<FlagIcon />}
              onClick={handleReport}
              variant="outlined"
              color="neutral"
              size="sm"
            >
              Signaler l'annonce
            </Button>
          </Box>

          {/** Contact Author */}
          <Box
            sx={{
              flex: "0 0 350px",
              height: "fit-content",
              padding: 2,
              borderRadius: "16px",
              border: "1px solid #dddddd",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Photo de profil de l'auteur de l'annonce"
                src={
                  lease.user.profilePictureName
                    ? PROFILE_PICTURE_PATH + "/" + lease.user.profilePictureName
                    : undefined
                }
                sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                }}
              />
              <Typography level="h6">{lease.user.firstName}</Typography>
            </Box>

            {/** Message */}
            <Button
              fullWidth
              startDecorator={<EmailIcon />}
              onClick={handleContact}
              sx={{ mt: 2 }}
            >
              Envoyer un message
            </Button>

            {/** Phone Number */}
            {lease.user.phoneNumber && (
              <Button
                fullWidth
                variant="soft"
                color="neutral"
                startDecorator={<PhoneAndroidIcon />}
                onClick={() => {
                  if (!user) setOpenSignAlert(true);
                }}
                sx={{ mt: 1 }}
              >
                {user
                  ? _formatPhoneNumber(lease.user.phoneNumber)
                  : _formatPhoneNumber(
                      lease.user.phoneNumber.slice(0, -4) + "XXXX"
                    )}
              </Button>
            )}
          </Box>
        </Box>

        <Typography level="h4" marginBottom={3}>
          Emplacement du logement
        </Typography>
        <LeaseMapWithNoSSR leases={[lease]} isMultiple={false} />
      </main>

      {/** Lightbox */}
      <LeaseLightbox
        images={lightboxImages}
        open={openLightbox}
        setOpen={setOpenLightbox}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      {/** Send message */}
      <Modal open={openMessage} onClose={() => setOpenMessage(false)}>
        <ModalDialog
          aria-labelledby="close-modal-contact"
          size="lg"
          sx={{ maxWidth: "700px" }}
        >
          <ModalClose />
          <ModalLayout title={"Envoyer un message"}>
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
        <ModalDialog
          aria-labelledby="close-modal-sign-alert"
          sx={{ maxWidth: "700px", padding: 0, border: "none" }}
        >
          <ModalClose />
          <SignAlert
            setOpenSignAlert={setOpenSignAlert}
            setOpenSignin={setOpenSignin}
            setOpenSignup={setOpenSignup}
          />
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
  const id = context?.params?.id;
  try {
    const lease = await getLease(id);
    return {
      props: { lease },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
/**
 * Format phone number
 * Ex: 0600000000 will return 06 00 00 00 00
 *
 * @param phoneNumber
 */
const _formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber
    .split("")
    .map((letter: string, index: number) => {
      return index % 2 === 0 ? letter : letter + " ";
    })
    .join("");
};
