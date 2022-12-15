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
import FavoriteIcon from "@mui/icons-material/Favorite";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PhoneIcon from "@mui/icons-material/Phone";
import PauseIcon from "@mui/icons-material/Pause";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";

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
        sx={{
          width: "fit-content",
          minHeight: 48,
          marginBottom: "40px",
          padding: 1,
          borderRadius: "md",
          bgcolor: "neutral.softBg",
          "--RadioGroup-gap": "4px",
          "--Radio-action-radius": "8px",
        }}
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
                sx: {
                  ...(checked && {
                    bgcolor: "background.surface",
                    boxShadow: "md",
                    "&:hover": {
                      bgcolor: "background.surface",
                    },
                  }),
                },
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
              textAlign: "center",
              "@media (max-width: 1150px)": { gridTemplateColumns: "1fr 1fr" },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/join.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Créez un compte gratuitement en 2 minutes
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/building.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Renseigner les informations du logement à louer
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/photos.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Ajoutez jusqu'à 4 magnifiques photos
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/chat.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Echangez avec des locataires via la messagerie intégrée
              </Typography>
            </ListItem>
          </List>
          <Box
            display="flex"
            gap={3}
            marginTop={4}
            sx={{
              "@media (max-width: 900px)": { display: "block" },
            }}
          >
            <Alert
              startDecorator={
                <PauseIcon sx={{ padding: 0.25, color: "#ffffff" }} />
              }
              sx={{
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                backgroundColor: "#474747",
                color: "#ffffff",
              }}
            >
              Vous pouvez suspendre la publication de votre annonce sans la
              supprimer
            </Alert>

            <Alert
              startDecorator={
                <PhoneIcon sx={{ padding: 0.25, color: "#ffffff" }} />
              }
              sx={{
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                backgroundColor: "#474747",
                color: "#ffffff",
              }}
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
              textAlign: "center",
              "@media (max-width: 1150px)": { gridTemplateColumns: "1fr 1fr" },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/search.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Parcourez et consultez les annonces
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/mailbox.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Envoyez un message via la messagerie intégrée
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/chat.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Posez vos questions et échangez sur votre situation
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Image
                src="/img/place.svg"
                alt="no result illustration"
                width="180"
                height="120"
              />
              <Typography mt={3} fontWeight={500}>
                Visitez le logement et positionnez vous 🤞
              </Typography>
            </ListItem>
          </List>
          <Box
            display="flex"
            gap={3}
            marginTop={4}
            sx={{
              "@media (max-width: 900px)": { display: "block" },
            }}
          >
            <Alert
              startDecorator={
                <FavoriteIcon
                  sx={{
                    padding: 0.25,
                    color: "#ffffff",
                  }}
                />
              }
              sx={{
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                backgroundColor: "#474747",
                color: "#ffffff",
              }}
            >
              Vous pouvez enregistrer une annonce en favoris et la retrouver
              plus tard
            </Alert>

            <Alert
              startDecorator={
                <HourglassFullIcon
                  sx={{
                    padding: 0.25,
                    color: "#ffffff",
                  }}
                />
              }
              sx={{
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                backgroundColor: "#474747",
                color: "#ffffff",
              }}
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
