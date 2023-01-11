"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { getLeases } from "../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import Header from "./components/header";
import LeaseCard from "./shared/lease-card";
import ModalLayout from "./shared/modal-layout";
import Signin from "./shared/signin";
import ResetPasswordAsk from "./shared/reset-password-ask";
import Signup from "./shared/signup";
import LeaseType from "./components/lease-type";
import DetailsSummary from "./components/details-summary";
import HowItWorks from "./components/how-it-works";
import Title from "./components/title";
import SubTitle from "./components/subtitle";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Avatar from "@mui/joy/Avatar";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FastForwardIcon from "@mui/icons-material/FastForward";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease, ILeasesWithCount } from "../interfaces/lease";
import { IDetailsSummary } from "../interfaces/IDetailsSummary";
/* -------------------------------- CONSTANTS ------------------------------- */
import mapImg from "../public/img/map.png";
import { FREQUENTLY_ASKED_QUESTIONS } from "../data/frequentlyAskedQuestions";
import { LEASE_TYPES } from "../data/leaseTypes";
import LeaseSkeleton from "./shared/lease-skeleton";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const SECTION_STYLES = {
  maxWidth: "1800px",
  margin: "0 auto",
  padding: "60px",
};

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const HomePage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery<ILeasesWithCount>(
    ["leases"],
    () => getLeases()
  );

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
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
    <Box marginX="auto">
      {/** Header */}
      <Header />

      <Box component="main">
        {/** Recent leases */}
        <Box sx={SECTION_STYLES}>
          <Title text="Annonces récentes" decorator={<WhatshotIcon />} />
          {isError && (
            <Box>
              <Typography sx={{ fontSize: "1.4rem" }}>
                Une erreur est survenue pendant le chargement des annonces
                récentes.
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              position: "relative", // InputCitySearch dropdown ABOVE this component
              zIndex: 0, // InputCitySearch dropdown ABOVE this component
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridColumnGap: "20px",
              gridRowGap: "20px",
              "@media (max-width: 1300px)": {
                gridTemplateColumns: "1fr 1fr",
              },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            {isLoading && [...Array(4)].map(() => <LeaseSkeleton />)}
            {data &&
              !!data.totalCount &&
              data?.leases
                .slice(0, 4)
                .map((lease: ILease) => (
                  <LeaseCard key={lease.id} lease={lease} />
                ))}
          </Box>
          {/** CTA */}
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: "60px",
              padding: 4,
              background: "linear-gradient(to right, #00c9ff, #92fe9d)",
              borderRadius: "16px",
              boxShadow: theme.vars.shadow.lg,
              "@media (max-width: 1100px)": {
                display: "block",
              },
            })}
          >
            <Typography
              fontSize="1.5rem"
              fontWeight="500"
              marginRight="30px"
              sx={{
                color: "#000000",
                "@media (max-width: 1100px)": {
                  fontSize: "1.3rem",
                },
              }}
            >
              Découvrez toutes nos offres de locations et de sous-locations
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                "@media (max-width: 800px)": {
                  display: "block",
                },
              }}
            >
              <Button
                size="lg"
                fullWidth
                onClick={() => router.push("/leases")}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "none",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                  "@media (max-width: 1100px)": {
                    mt: 3,
                  },
                }}
              >
                Parcourir les annonces
              </Button>
            </Box>
          </Box>
        </Box>

        {/** Lease types */}
        <Box
          sx={{
            ...SECTION_STYLES,
            backgroundColor: "#19191d",
          }}
        >
          <Title
            text="À chaque situation son logement"
            decorator={<TaskAltIcon />}
          />
          <SubTitle>
            La carte des logements est un service de mise en relation entre
            particuliers permettant de louer ou de sous-louer facilement un
            appartement ou une maison.
          </SubTitle>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridColumnGap: "20px",
              gridRowGap: "20px",
              "@media (max-width: 1300px)": { gridTemplateColumns: "1fr 1fr" },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            {LEASE_TYPES.map(
              ({ title, description, duration, imgName, info }) => (
                <Link href="/leases" key={title}>
                  <Box flex="1 1" sx={{ cursor: "pointer" }}>
                    <LeaseType
                      title={title}
                      description={description}
                      duration={duration}
                      imgName={imgName}
                      info={info}
                    />
                  </Box>
                </Link>
              )
            )}
          </Box>
        </Box>

        {/** CTA */}
        <Card
          sx={{
            "--Card-radius": "0px",
            height: "260px",
            boxShadow: "none",
          }}
        >
          <CardCover>
            <Image src={mapImg} alt="map illustration" />
          </CardCover>
          <CardCover
            sx={{
              background: "rgba(29, 29, 38, 0.5)",
            }}
          />
          <CardContent sx={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              onClick={() => router.push("/leases")}
              size="lg"
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                "&:hover": {
                  backgroundColor: "#eeeeee",
                },
              }}
            >
              Voir les annonces sur la carte
            </Button>
          </CardContent>
        </Card>

        {/** How it works */}
        <Box sx={SECTION_STYLES}>
          <Title text="Seulement 4 étapes" decorator={<FastForwardIcon />} />
          <SubTitle>
            La carte des logements vous propose un fonctionnement simple afin de
            vous offrir une mise en relation rapide de particulier à
            particulier.
          </SubTitle>
          <Box marginBottom="60px">
            <HowItWorks />
          </Box>
          {/** CTA */}
          {!user && (
            <Box
              sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mt: "60px",
                padding: 4,
                background: "linear-gradient(to right, #00c9ff, #92fe9d)",
                borderRadius: "16px",
                boxShadow: theme.vars.shadow.lg,
                "@media (max-width: 1100px)": {
                  display: "block",
                },
              })}
            >
              <Typography
                fontSize="1.5rem"
                fontWeight="500"
                marginRight="30px"
                sx={{
                  color: "#000000",
                  "@media (max-width: 1100px)": {
                    fontSize: "1.3rem",
                    mb: 3,
                  },
                }}
              >
                Optez pour la simplicité
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "@media (max-width:800px)": {
                    display: "block",
                  },
                }}
              >
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => setOpenSignup(true)}
                  sx={{
                    whiteSpace: "nowrap",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                    "@media (max-width: 1100px)": {
                      mb: 1,
                    },
                  }}
                >
                  Créer un compte
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => setOpenSignin(true)}
                  sx={{
                    whiteSpace: "nowrap",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                    "@media (max-width: 1100px)": {
                      mb: 1,
                    },
                  }}
                >
                  Se connecter
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        {/** FAQ */}
        <Box
          sx={{
            ...SECTION_STYLES,
            backgroundColor: "#19191d",
          }}
        >
          <Title
            text="Questions fréquentes"
            decorator={<QuestionAnswerIcon />}
          />
          <Box display="flex" flexDirection="column" gap={1.5}>
            {FREQUENTLY_ASKED_QUESTIONS.map(
              ({ summary, details }: IDetailsSummary, index: number) => (
                <DetailsSummary
                  key={index}
                  summary={summary}
                  details={details}
                />
              )
            )}
          </Box>
        </Box>

        {/** Review */}
        <Box sx={SECTION_STYLES}>
          <Title text="Avis qui font plaisir" decorator={<AutoAwesomeIcon />} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridColumnGap: "30px",
              gridRowGap: "30px",
              marginTop: "40px",
              "@media (max-width: 1100px)": { gridTemplateColumns: "1fr" },
            }}
          >
            {[
              {
                avatarSrc: "/img/review-isabelle.jpg",
                fullName: "Isabelle L.",
                date: "23 décembre 2022",
                review:
                  "Merci de m'avoir aidé à trouver un locataire sérieux rapidement.",
              },
              {
                avatarSrc: "/img/review-victor.jpg",
                fullName: "Victor H.",
                date: "11 janvier 2023",
                review:
                  "Une bonne alternative à lacartedescolocs ou leboncoin.",
              },
              {
                avatarSrc: "/img/review-mathieu.jpg",
                fullName: "Mathieu R.",
                date: "14 janvier 2023",
                review:
                  "Un bon site pour les locations meublées de moins d'un an.",
              },
            ].map(({ avatarSrc, fullName, date, review }, index) => (
              <Box
                key={index}
                sx={(theme) => ({
                  paddingX: 2,
                  paddingY: 3,
                  borderRadius: "12px",
                  backgroundColor:
                    theme.colorSchemes.dark.palette.neutral.softBg,
                })}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                  mb={3}
                >
                  <Avatar
                    src={avatarSrc}
                    sx={{ width: "72px", height: "72px" }}
                  />
                  <Box>
                    <Typography level="h6" component="p">
                      {fullName}
                    </Typography>
                    <Typography level="body2">{date}</Typography>
                  </Box>
                </Box>
                <Typography
                  level="body2"
                  fontSize="1.05rem"
                  fontStyle="italic"
                  textAlign="center"
                >
                  &laquo; {review} &raquo;
                </Typography>
                <Box mt={3} textAlign="center">
                  <StarIcon sx={{ color: "orange" }} />
                  <StarIcon sx={{ color: "orange" }} />
                  <StarIcon sx={{ color: "orange" }} />
                  <StarIcon sx={{ color: "orange" }} />
                  <StarIcon
                    sx={{ color: index === 2 ? "initial" : "orange" }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
          {/** CTA */}
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: "60px",
              padding: 4,
              background: "linear-gradient(to right, #00c9ff, #92fe9d)",
              borderRadius: "16px",
              boxShadow: theme.vars.shadow.lg,
              "@media (max-width: 1100px)": {
                display: "block",
              },
            })}
          >
            <Typography
              fontSize="1.5rem"
              fontWeight="500"
              marginRight="30px"
              sx={{
                color: "#000000",
                "@media (max-width: 1100px)": {
                  fontSize: "1.3rem",
                  mb: 3,
                },
              }}
            >
              C'est le moment d'aller plus loin
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                "@media (max-width: 800px)": {
                  display: "block",
                },
              }}
            >
              {!user && (
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => setOpenSignup(true)}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "none",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                    "@media (max-width: 800px)": {
                      mb: 1,
                    },
                  }}
                >
                  Créer un compte
                </Button>
              )}
              <Button
                size="lg"
                fullWidth
                onClick={() => router.push("/leases")}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "none",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                  "@media (max-width: 800px)": {
                    mb: 1,
                  },
                }}
              >
                Découvrir les annonces
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

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
    </Box>
  );
};

export default HomePage;
