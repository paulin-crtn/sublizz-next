/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Image from "next/future/image";
import homePic from "../public/img/home.jpg";
import InputCitySearch from "../components/input-city-search";
import Box from "@mui/joy/Box";
import { getLeases } from "../utils/fetch/fetchLease";
import { ILease } from "../interfaces/lease";
import LeaseCard from "../components/lease-card";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import LeaseType from "../components/lease-type";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import ModalLayout from "../components/modal-layout";
import Signin from "../components/signin";
import PasswordReset from "../components/password-reset";
import { useState } from "react";
import Signup from "../components/signup";
import Alert from "@mui/joy/Alert";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerIcon from "@mui/icons-material/Power";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(() => import("../components/lease-map"), {
  ssr: false,
});

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      <header>
        <Card>
          <CardCover>
            <Image
              src={homePic}
              alt="Picture of a parisian appartment"
              placeholder="blur"
            />
          </CardCover>
          <CardCover />
          <CardContent sx={{ marginX: 4, marginY: 6 }}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                component="h1"
                level="h1"
                width="55%"
                fontFamily="Bitter"
                fontSize={42}
                fontWeight={800}
                lineHeight={1.2}
              >
                Locations et sous-locations temporaires entre particuliers
              </Typography>
              <Typography
                component="h2"
                level="h5"
                width="40%"
                marginTop={2}
                fontWeight={300}
              >
                Découvrez nos offres de location de courte et moyenne durée sans
                frais d’agence
              </Typography>
            </Box>
            <InputCitySearch isLarge={true} />
            <Link href="/leases">
              <FormHelperText sx={{ mt: 2, cursor: "pointer" }}>
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
        >
          Dernières annonces publiées
        </Typography>

        {!!data.totalCount && (
          <Box sx={{ display: "flex", gap: 6 }}>
            <Box flex="1 1">
              {data.leases.slice(0, 3).map((lease: ILease, index: number) => (
                <Link href={`/leases/${lease.id}`} key={lease.id}>
                  <Box sx={{ cursor: "pointer" }}>
                    {index !== 0 && <Divider />}
                    <LeaseCard lease={lease} />
                  </Box>
                </Link>
              ))}
            </Box>
            <Box flex="0 0 420px" sx={{ borderRadius: "10px" }}>
              <LeaseMapWithNoSSR
                leases={data.leases.slice(0, 3)}
                isMultiple={true}
              />
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
          }}
        >
          <Typography
            fontSize="1.5rem"
            fontWeight="500"
            marginRight="30px"
            sx={{ color: "#ffffff" }}
          >
            Découvrez toutes nos offres de locations et de sous-locations
          </Typography>
          <Button
            size="lg"
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
            Découvrir les annonces
          </Button>
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
          <Box display="flex" alignItems="stretch" gap={6}>
            {/** OWNER */}
            <Box sx={{ flex: "1 1" }}>
              <Typography
                component="h4"
                level="h5"
                fontWeight={400}
                sx={{
                  padding: 2,
                  // @ts-ignore
                  background: "linear-gradient(to right, #4700cc, #920be3)",
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
                  Renseignez votre numéro de téléphone pour être contacté plus
                  rapidement.
                </Alert>
              </Box>
            </Box>

            {/** SEEKER */}
            <Box sx={{ flex: "1 1" }}>
              <Typography
                component="h4"
                level="h5"
                fontWeight={400}
                sx={{
                  padding: 2,
                  // @ts-ignore
                  background: "linear-gradient(to right, #4700cc, #920be3)",
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
              </Box>
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
          }}
        >
          <Typography
            fontSize="1.5rem"
            fontWeight="500"
            marginRight="30px"
            sx={{ color: "#ffffff" }}
          >
            Optez pour la simplicité
          </Typography>
          <Box
            flex="0 0 400px"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Button
              size="lg"
              onClick={() => setOpenSignup(true)}
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                "&:hover": {
                  backgroundColor: "#eeeeee",
                },
              }}
            >
              Créer un compte
            </Button>
            <Button
              size="lg"
              onClick={() => setOpenSignin(true)}
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                "&:hover": {
                  backgroundColor: "#eeeeee",
                },
              }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography
            level="h3"
            marginTop="60px"
            marginBottom="20px"
            fontFamily="Bitter"
            fontSize="2.2rem"
            fontWeight={700}
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
          <Box display="flex" alignItems="stretch" gap={3}>
            {[
              {
                title: "Bail étudiant",
                description:
                  "Pour celles et ceux qui doivent déménager afin de suivre des études supérieurs.",
                duration: "Durée de 9 mois",
                imgName: "student.jpg",
                info: "Logement meublé",
              },
              {
                title: "Bail mobilité",
                description:
                  "Pour les salariés en mission temporaire ou en formation professionnelle.",
                duration: "Durée de 1 à 10 mois",
                imgName: "mobility.jpg",
                info: "Logement meublé",
              },
              {
                title: "Colocation",
                description:
                  "Pour les budgets plus limités ou les personnes qui aiment la vie à plusieurs.",
                duration: "Durée variable",
                imgName: "share.jpg",
                info: "Avec ou sans clause de solidarité",
              },
              {
                title: "Sous-location",
                description:
                  "Pour s’absenter de son logement sans perdre de loyer ou se loger temporairement.",
                duration: "Durée variable",
                imgName: "sublease.jpg",
                info: "Avec accord du propriétaire",
              },
            ].map(({ title, description, duration, imgName, info }) => (
              <Box key={title} flex="1 1">
                <LeaseType
                  title={title}
                  description={description}
                  duration={duration}
                  imgName={imgName}
                  info={info}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          level="h3"
          marginTop="60px"
          marginBottom="30px"
          fontFamily="Bitter"
          fontSize="2.2rem"
          fontWeight={700}
        >
          Questions fréquentes
        </Typography>
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
