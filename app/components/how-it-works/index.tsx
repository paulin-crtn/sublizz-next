/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ForumIcon from "@mui/icons-material/Forum";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import TourIcon from "@mui/icons-material/Tour";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PhoneIcon from "@mui/icons-material/Phone";
import PauseIcon from "@mui/icons-material/Pause";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const getStyles = (theme: Theme) => ({
  width: "90px",
  height: "90px",
  display: "flex",
  backgroundColor: "#ffffff", // theme.colorSchemes.dark.palette.primary.softBg,
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
  // undraw pictures color #F9A826
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
              "@media (max-width: 1150px)": { gridTemplateColumns: "1fr 1fr" },
              "@media (max-width: 800px)": { gridTemplateColumns: "1fr" },
            }}
          >
            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <PersonIcon sx={{ fontSize: "4rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Créez un compte
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                En 2 minutes et gratuitement
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <CreateIcon sx={{ fontSize: "4rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Décrivez le logement
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Type de bail, surface, prix...
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <AddPhotoAlternateIcon sx={{ fontSize: "4rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Ajoutez des photos
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Montrez tout sans complexe
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <ForumIcon sx={{ fontSize: "3.5rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Echangez avec des locataires
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Via notre messagerie intégrée
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
              variant="plain"
              color="neutral"
              startDecorator={<PauseIcon sx={{ padding: 0.25 }} />}
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                border: "1px solid",
                borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
              })}
            >
              Vous pouvez suspendre la publication de votre annonce sans la
              supprimer
            </Alert>

            <Alert
              variant="plain"
              color="neutral"
              startDecorator={<PhoneIcon sx={{ padding: 0.25 }} />}
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                border: "1px solid",
                borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
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
              <Box sx={(theme) => getStyles(theme)}>
                <SearchIcon sx={{ fontSize: "4rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Parcourez les annonces
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                En liste ou sur la carte
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <SendIcon sx={{ fontSize: "3.5rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Envoyez un message
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Pour vous présenter
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <ForumIcon sx={{ fontSize: "3.5rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
                Echangez avec les propriétaires
              </Typography>
              <Typography mt={0.5} fontWeight={300}>
                Via notre messagerie intégrée
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "block" }}>
              <Box sx={(theme) => getStyles(theme)}>
                <TourIcon sx={{ fontSize: "3.5rem" }} />
              </Box>
              <Typography mt={3} fontWeight={500}>
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
              variant="plain"
              color="neutral"
              startDecorator={
                <FavoriteIcon
                  sx={{
                    padding: 0.25,
                  }}
                />
              }
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                border: "1px solid",
                borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
              })}
            >
              Vous pouvez enregistrer une annonce en favoris et la retrouver
              plus tard
            </Alert>

            <Alert
              variant="plain"
              color="neutral"
              startDecorator={
                <HourglassFullIcon
                  sx={{
                    padding: 0.25,
                  }}
                />
              }
              sx={(theme) => ({
                flex: "1 1",
                marginTop: 1,
                paddingX: 2,
                border: "1px solid",
                borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
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
