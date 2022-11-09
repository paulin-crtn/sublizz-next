/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import FormControl from "@mui/joy/FormControl";
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

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <Box sx={{ margin: "0 0 60px 0", width: "65%" }}>
          <Typography
            component="h1"
            level="h1"
            fontFamily="Bitter"
            fontSize={48}
            fontWeight={800}
            lineHeight={1.2}
          >
            Locations et sous-locations temporaires entre particuliers
          </Typography>
          <Typography component="h2" level="h5" marginTop={2} fontWeight={300}>
            Réalisez vos projets en découvrant nos offres de locations de
            courtes durées sans frais d’agence 🙌
          </Typography>
        </Box>

        <Card sx={{ height: "300px" }}>
          <CardCover>
            <Image
              src={homePic}
              alt="Picture of a parisian appartment"
              placeholder="blur"
            />
          </CardCover>
          <CardContent>
            <FormControl sx={{ my: "auto", ml: "30px" }}>
              <Typography level="h4" mb={3}>
                Dans quelle ville cherchez-vous ?
              </Typography>
              <InputCitySearch isLarge={true} />
              <FormHelperText sx={{ mt: 2 }}>
                <Link href="/leases">Voir toutes les annonces</Link>
              </FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </header>
      <main>
        <Typography
          level="h3"
          marginTop="60px"
          marginBottom="30px"
          fontFamily="Bitter"
          fontWeight={600}
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
            <Box
              flex="0 0 300px"
              sx={{ backgroundColor: "#ccc", borderRadius: "10px" }}
            >
              hello
            </Box>
          </Box>
        )}

        <Box>
          <Typography
            level="h3"
            marginTop="40px"
            marginBottom="20px"
            fontFamily="Bitter"
            fontWeight={600}
          >
            Louer ou sous-louer en toute simplicité
          </Typography>
          <Typography
            maxWidth="820px"
            marginBottom={3}
            fontSize="1.1rem"
            fontWeight={300}
          >
            La carte des logements est un service de mise en relation entre
            particuliers visant à faciliter la mise en location ou sous-location
            d’un appartement ou d’une maison. Les baux et contrats suivants sont
            disponibles :
          </Typography>
          <Box display="flex" alignItems="stretch" gap={2}>
            {[
              {
                title: "Bail étudiant",
                description:
                  "Pour celles et ceux qui doivent déménager afin de suivre des études supérieurs.",
                duration: "Durée de 9 mois",
                info: "Logement meublé",
              },
              {
                title: "Bail mobilité",
                description:
                  "Pour les salariés en mission temporaire ou en formation professionnelle.",
                duration: "Durée de 1 à 10 mois",
                info: "Logement meublé",
              },
              {
                title: "Colocation",
                description:
                  "Pour les budgets plus limités ou les personnes à la recherche de convivialité.",
                duration: "Durée variable",
                info: "Avec ou sans clause de solidarité",
              },
              {
                title: "Sous-location",
                description:
                  "Pour s’absenter de son logement sans perdre d’argent ou se loger temporairement.",
                duration: "Durée variable",
                info: "Avec accord du propriétaire",
              },
            ].map(({ title, description, duration, info }) => (
              <Box key={title} flex="1 1">
                <LeaseType
                  title={title}
                  description={description}
                  duration={duration}
                  info={info}
                />
              </Box>
            ))}
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
            fontSize="1.7rem"
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

        <Typography
          level="h3"
          marginTop="40px"
          marginBottom="20px"
          fontFamily="Bitter"
          fontWeight={600}
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
