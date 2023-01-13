/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Image from "next/image";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
/* ----------------------------------- MUI ---------------------------------- */
import { Theme } from "@mui/joy";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
/* ----------------------------- MATERIAL ICONS ----------------------------- */
// import PersonIcon from "@mui/icons-material/Person";
// import CreateIcon from "@mui/icons-material/Create";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import ForumIcon from "@mui/icons-material/Forum";
// import SearchIcon from "@mui/icons-material/Search";
// import SendIcon from "@mui/icons-material/Send";
// import TourIcon from "@mui/icons-material/Tour";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PhoneIcon from "@mui/icons-material/Phone";
import PauseIcon from "@mui/icons-material/Pause";
/* -------------------------------- CONSTANTS ------------------------------- */
import signupImg from "../../../public/img/howitworks/signup.svg";
import describeImg from "../../../public/img/howitworks/describe.svg";
import pictureImg from "../../../public/img/howitworks/picture.svg";
import chatImg from "../../../public/img/howitworks/chat.svg";
import searchImg from "../../../public/img/howitworks/search.svg";
import messageImg from "../../../public/img/howitworks/message.svg";
import flagImg from "../../../public/img/howitworks/flag.svg";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const getStyles = (theme: Theme) => ({
  width: "110px",
  height: "110px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "4rem",
  backgroundColor: theme.colorSchemes.dark.palette.neutral.softBg,
  borderRadius: "16px",
  "& > svg": {
    margin: "auto",
    color: "#000000",
  },
});

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const HowItWorks = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [showRole, setShowRole] = useState<string>("Je propose un logement");

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box>
      <RadioGroup
        row
        name="mapOrList"
        size="sm"
        value={showRole}
        onChange={(event) => setShowRole(event.target.value)}
        sx={(theme) => ({
          width: "fit-content",
          minHeight: 48,
          marginBottom: 3,
          padding: 1,
          borderRadius: "md",
          bgcolor: "neutral.softBg",
          "--RadioGroup-gap": "4px",
          "--Radio-action-radius": "8px",
        })}
      >
        {["Je propose un logement", "Je cherche un logement"].map((item) => (
          <Radio
            id={item}
            key={item}
            color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              padding: 2,
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: 500,
              "@media (max-width: 800px)": { fontSize: "1rem" },
            }}
            componentsProps={{
              action: ({ checked }) => ({
                sx: (theme) => ({
                  "&:hover": {
                    backgroundColor:
                      theme.colorSchemes.dark.palette.neutral[700],
                  },
                  ...(checked && {
                    backgroundColor:
                      theme.colorSchemes.dark.palette.neutral[700],
                    boxShadow: "md",
                    "&:hover": {
                      backgroundColor:
                        theme.colorSchemes.dark.palette.neutral[700],
                    },
                  }),
                }),
              }),
            }}
          />
        ))}
      </RadioGroup>
      {/** OWNER */}
      {showRole === "Je propose un logement" && (
        <Box sx={{ marginY: 4 }}>
          <List
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridColumnGap: "30px",
              gridRowGap: "20px",
              "@media (max-width: 1150px)": { gridTemplateColumns: "1fr 1fr" },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            <ListItem sx={{ display: "block" }}>
              <Image
                src={signupImg}
                alt="signup illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Créez un compte
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                En 2 minutes et gratuitement
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src={describeImg}
                alt="pencil illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Décrivez le logement
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Type de bail, surface, prix...
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src={pictureImg}
                alt="add picture illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Ajoutez des photos
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Montrez tout sans complexe
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src={chatImg}
                alt="chat illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Echangez avec des locataires
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Via la messagerie intégrée
              </Typography>
            </ListItem>
          </List>
          <Box
            display="flex"
            gap={3}
            marginTop={2}
            sx={{
              "@media (max-width: 900px)": { display: "block" },
            }}
          >
            <Alert
              color="info"
              startDecorator={
                <PauseIcon sx={{ padding: 0.25, color: "#000000" }} />
              }
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                color: "#000000",
              })}
            >
              Vous pouvez suspendre la publication de votre annonce sans la
              supprimer
            </Alert>

            <Alert
              color="info"
              startDecorator={
                <PhoneIcon sx={{ padding: 0.25, color: "#000000" }} />
              }
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                color: "#000000",
              })}
            >
              Renseignez votre numéro de téléphone pour être contacté
              directement
            </Alert>
          </Box>
        </Box>
      )}

      {/** SEEKER */}
      {showRole === "Je cherche un logement" && (
        <Box sx={{ marginY: 4 }}>
          <List
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridColumnGap: "30px",
              gridRowGap: "20px",
              "@media (max-width: 1150px)": { gridTemplateColumns: "1fr 1fr" },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            <ListItem sx={{ display: "block" }}>
              <Image
                src={searchImg}
                alt="search illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Parcourez les annonces
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Sur la carte ou en liste
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src={messageImg}
                alt="message illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Envoyez un message
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Pour vous présenter
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src={chatImg}
                alt="chat illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Echangez avec les propriétaires
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Via la messagerie intégrée
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src={flagImg}
                alt="flag illustration"
                width={100}
                height={100}
                priority
              />
              <Typography mt={2} fontWeight={500}>
                Visitez le logement
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Et positionnez vous
              </Typography>
            </ListItem>
          </List>
          <Box
            display="flex"
            gap={3}
            marginTop={2}
            sx={{
              "@media (max-width: 900px)": { display: "block" },
            }}
          >
            <Alert
              color="info"
              startDecorator={
                <FavoriteIcon
                  sx={{
                    padding: 0.25,
                    color: "#000000",
                  }}
                />
              }
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                color: "#000000",
              })}
            >
              Vous pouvez enregistrer une annonce en favoris et la retrouver
              plus tard
            </Alert>

            <Alert
              color="info"
              startDecorator={
                <HourglassFullIcon
                  sx={{
                    padding: 0.25,
                    color: "#000000",
                  }}
                />
              }
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                color: "#000000",
              })}
            >
              Gagnez du temps en enregistrant une réponse type
            </Alert>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HowItWorks;
