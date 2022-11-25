/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { useState } from "react";
/* ---------------------------------- UTILS --------------------------------- */
import { getLeases } from "../utils/fetch/fetchLease";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import InputCitySearch from "../components/shared/input-city-search";
import LeaseCard from "../components/public/lease-card";
import ModalLayout from "../components/shared/modal-layout";
import Signin from "../components/public/signin";
import PasswordReset from "../components/public/password-reset";
import Signup from "../components/public/signup";
import LeaseType from "../components/public/lease-type";
import DetailsSummary from "../components/public/details-summary";
/* ----------------------------------- MUI ---------------------------------- */
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Alert from "@mui/joy/Alert";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
/* ---------------------------------- ICONS --------------------------------- */
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerIcon from "@mui/icons-material/Power";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../interfaces/lease";
import { IDetailsSummary } from "../interfaces/IDetailsSummary";
/* -------------------------------- CONSTANTS ------------------------------- */
import homeImg from "../public/img/home.jpg";
import mapImg from "../public/img/map.jpg";
import { FREQUENTLY_ASKED_QUESTIONS } from "../data/frequentlyAskedQuestions";
import { LEASE_TYPES } from "../data/leaseTypes";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

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
    <>
      <Head>
        <title>
          Location et sous-location entre particuliers | lacartedeslogements
        </title>
        <meta
          name="description"
          content="⭐⭐⭐ Louer ou sous-louer de particulier à particulier grâce à nos annonces immobilières pas chères et sans frais d'agence"
        />
      </Head>
      <header>
        <Card>
          <CardCover>
            <Image
              src={homeImg}
              alt="Picture of a parisian appartment"
              placeholder="blur"
            />
          </CardCover>
          <CardCover
            sx={{
              "@media (max-width: 1100px)": {
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4) 320px)",
              },
            }}
          />
          <CardContent
            sx={{
              marginX: 4,
              marginY: 6,
              "@media (max-width: 1100px)": { marginX: 2, marginY: 4 },
            }}
          >
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                component="h1"
                level="h1"
                width="55%"
                fontFamily="Bitter"
                fontSize={42}
                fontWeight={800}
                lineHeight={1.2}
                sx={{
                  "@media (max-width: 1100px)": {
                    width: "100%",
                    fontSize: "2rem",
                    color: "#ffffff",
                  },
                }}
              >
                Locations et sous-locations temporaires entre particuliers
              </Typography>
              <Typography
                component="h2"
                level="h5"
                width="40%"
                marginTop={2}
                fontWeight={400}
                sx={{
                  "@media (max-width: 1100px)": {
                    width: "100%",
                    fontSize: "1.1rem",
                    color: "#ffffff",
                  },
                }}
              >
                Annonces immobilières sans frais d’agence : location meublée,
                colocation et sous-location.
              </Typography>
            </Box>
            <Box sx={{ maxWidth: "420px" }}>
              <InputCitySearch isLarge={true} />
            </Box>
            <Link href="/leases">
              <FormHelperText
                sx={{
                  mt: 2,
                  cursor: "pointer",
                  "@media (max-width: 1100px)": {
                    color: "#ffffff",
                  },
                }}
              >
                Voir toutes les annonces
              </FormHelperText>
            </Link>
          </CardContent>
        </Card>
      </header>
      <main>
        <Typography
          level="h3"
          marginTop="60px"
          marginBottom="30px"
          fontFamily="Bitter"
          fontSize="2.2rem"
          fontWeight={700}
          sx={{
            "@media (max-width: 800px)": {
              fontSize: "1.8rem",
            },
          }}
        >
          Dernières annonces publiées
        </Typography>

        {!!data.totalCount && (
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              gap: 6,
            }}
          >
            <Box flex="1 1">
              {data.leases.slice(0, 3).map((lease: ILease, index: number) => (
                <Link href={`/leases/${lease.id}`} key={lease.id}>
                  <Box sx={{ cursor: "pointer" }}>
                    {index !== 0 && (
                      <Divider
                        sx={{
                          "@media (max-width: 760px)": {
                            display: "none",
                          },
                        }}
                      />
                    )}
                    <LeaseCard lease={lease} />
                  </Box>
                </Link>
              ))}
            </Box>
            <Box
              flex="0 0 400px"
              alignSelf="stretch"
              sx={{ "@media (max-width: 1300px)": { display: "none" } }}
            >
              <Card sx={{ height: "100%", boxShadow: "none" }}>
                <CardCover>
                  <Image src={mapImg} alt="map illustration" />
                </CardCover>
                <CardCover
                  sx={{
                    background: "rgba(0,0,0,0.2)",
                  }}
                />
                <CardContent
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    onClick={() => router.push("/leases")}
                    sx={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "#eeeeee",
                      },
                    }}
                  >
                    Voir sur la carte
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: "40px",
            padding: 4,
            backgroundColor: "#262626",
            borderRadius: "16px",
            "@media (max-width: 1100px)": {
              display: "block",
            },
          }}
        >
          <Typography
            fontSize="1.5rem"
            fontWeight="500"
            marginRight="30px"
            sx={{
              color: "#ffffff",
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
              Découvrir les annonces
            </Button>
          </Box>
        </Box>

        {/** How it works */}
        <Box>
          <Typography
            level="h3"
            marginTop="60px"
            marginBottom="20px"
            fontFamily="Bitter"
            fontSize="2.2rem"
            fontWeight={700}
            sx={{
              "@media (max-width: 800px)": {
                fontSize: "1.8rem",
              },
            }}
          >
            Comment ça marche ?
          </Typography>
          <Typography
            maxWidth="820px"
            marginBottom="30px"
            fontSize="1.1rem"
            fontWeight={300}
          >
            La carte des logements vous propose un fonctionnement simple afin de
            vous offrir une mise en relation rapide de particulier à
            particulier.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: "30px",
              gridRowGap: "20px",
              "@media (max-width: 1300px)": { gridTemplateColumns: "1fr" },
            }}
          >
            {/** OWNER */}
            <Box sx={{ flex: "1 1" }}>
              <Typography
                component="h4"
                level="h5"
                sx={{
                  paddingX: 3,
                  paddingY: 2,
                  // @ts-ignore
                  background: "linear-gradient(to right, #4700cc, #652ba9)",
                  color: "#ffffff",
                  borderRadius: "12px",
                }}
              >
                Je propose un logement
              </Typography>
              <Box sx={{ marginY: 2 }}>
                <List>
                  <ListItem>
                    <ListItemDecorator>1️⃣</ListItemDecorator>Créez un compte
                    gratuitement en 2 minutes
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>2️⃣</ListItemDecorator>Cliquez sur
                    « Publier une annonce » puis remplissez le formulaire
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>3️⃣</ListItemDecorator>
                    Ajoutez jusqu'à 4 photos
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>4️⃣</ListItemDecorator>
                    Echangez avec de futurs locataires via la messagerie
                    intégrée
                  </ListItem>
                </List>
                <Alert
                  color="info"
                  startDecorator={<PowerIcon />}
                  sx={{ mt: 1 }}
                >
                  Vous pouvez suspendre la publication de votre annonce sans la
                  supprimer.
                </Alert>
                <Alert
                  color="info"
                  startDecorator={<PhoneAndroidIcon />}
                  sx={{ mt: 1 }}
                >
                  Renseignez votre numéro de téléphone pour être contacté
                  directement.
                </Alert>
              </Box>
            </Box>

            {/** SEEKER */}
            <Box sx={{ flex: "1 1" }}>
              <Typography
                component="h4"
                level="h5"
                sx={{
                  paddingX: 3,
                  paddingY: 2,
                  // @ts-ignore
                  background: "linear-gradient(to right, #4700cc, #652ba9)",
                  color: "#ffffff",
                  borderRadius: "12px",
                }}
              >
                Je cherche un logement
              </Typography>
              <Box sx={{ marginY: 2 }}>
                <List>
                  <ListItem>
                    <ListItemDecorator>1️⃣</ListItemDecorator>Créez un compte
                    gratuitement en 2 minutes
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>2️⃣</ListItemDecorator>Contactez l'auteur
                    d'une annonce via la messagerie intégrée
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>3️⃣</ListItemDecorator>
                    Posez vos questions et échangez sur votre situation
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>4️⃣</ListItemDecorator>
                    Visitez le logement et positionnez vous 🤞
                  </ListItem>
                </List>
                <Alert
                  color="info"
                  startDecorator={<FavoriteIcon />}
                  sx={{ mt: 1 }}
                >
                  Vous pouvez enregistrer une annonce en favoris et la retrouver
                  plus tard.
                </Alert>
                <Alert
                  color="info"
                  startDecorator={<HourglassFullIcon />}
                  sx={{ mt: 1 }}
                >
                  Gagnez du temps en enregistrant une réponse type.
                </Alert>
              </Box>
            </Box>
          </Box>
        </Box>

        {!user && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: "40px",
              padding: 4,
              backgroundColor: "#262626",
              borderRadius: "16px",
              "@media (max-width: 1100px)": {
                display: "block",
              },
            }}
          >
            <Typography
              fontSize="1.5rem"
              fontWeight="500"
              marginRight="30px"
              sx={{
                color: "#ffffff",
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

        <Box>
          <Typography
            level="h3"
            marginTop="60px"
            marginBottom="20px"
            fontFamily="Bitter"
            fontSize="2.2rem"
            fontWeight={700}
            sx={{
              "@media (max-width: 800px)": {
                fontSize: "1.8rem",
              },
            }}
          >
            Trouvez le logement qui convient à votre situation
          </Typography>
          <Typography
            maxWidth="820px"
            marginBottom="30px"
            fontSize="1.1rem"
            fontWeight={300}
          >
            La carte des logements est un service de mise en relation entre
            particuliers permettant de louer ou de sous-louer facilement un
            appartement ou une maison.
          </Typography>
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
                <Box key={title} flex="1 1">
                  <LeaseType
                    title={title}
                    description={description}
                    duration={duration}
                    imgName={imgName}
                    info={info}
                  />
                </Box>
              )
            )}
          </Box>
        </Box>

        <Box>
          <Typography
            level="h3"
            marginTop="60px"
            marginBottom="30px"
            fontFamily="Bitter"
            fontSize="2.2rem"
            fontWeight={700}
            sx={{
              "@media (max-width: 800px)": {
                fontSize: "1.8rem",
              },
            }}
          >
            Questions fréquentes
          </Typography>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: "40px",
            padding: 4,
            backgroundColor: "#262626",
            borderRadius: "16px",
            "@media (max-width: 1100px)": {
              display: "block",
            },
          }}
        >
          <Typography
            fontSize="1.5rem"
            fontWeight="500"
            marginRight="30px"
            sx={{
              color: "#ffffff",
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
      </main>

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
            <PasswordReset setOpenPasswordReset={setOpenPasswordReset} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Home;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getLeases();
  return {
    props: { data },
  };
};
