/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CookieBanner = ({
  setOpenCookie,
}: {
  setOpenCookie: Dispatch<SetStateAction<boolean>>;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [checkedAnalytics, setCheckedAnalytics] = useState<boolean>(true);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const handleAcceptAll = () => {
    setCheckedAnalytics(true);
    const cookiePreferences = JSON.stringify({ analytics: true });
    localStorage.setItem(
      "lacartesdeslogements_cookie_preferences",
      cookiePreferences
    );
    setOpenCookie(false);
  };

  const handleRefuseAll = () => {
    setCheckedAnalytics(false);
    const cookiePreferences = JSON.stringify({ analytics: false });
    localStorage.setItem(
      "lacartesdeslogements_cookie_preferences",
      cookiePreferences
    );
    setOpenCookie(false);
  };

  const handleAcceptSelection = () => {
    const cookiePreferences = JSON.stringify({ analytics: checkedAnalytics });
    localStorage.setItem(
      "lacartesdeslogements_cookie_preferences",
      cookiePreferences
    );
    setOpenCookie(false);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box padding={1}>
      <Typography
        marginBottom={2}
        fontSize="1.9rem"
        fontWeight={600}
        letterSpacing={0}
      >
        lacartedeslogements
      </Typography>
      <Typography marginRight={2} fontWeight={500} fontSize="1.4rem">
        Gestion des cookies
      </Typography>
      <Typography
        fontSize="1.1rem"
        fontWeight={300}
        marginTop={1}
        sx={{ color: "inherit" }}
      >
        Pour améliorer votre expérience utilisateur et mesurer l’audience de
        notre site, la carte des logements utilise des cookies.
      </Typography>

      {showSettings && (
        <>
          <Divider sx={{ marginTop: 4, marginBottom: 3 }} />

          <Box display="flex">
            <Box flex="1 0" marginRight={4}>
              <Typography marginBottom={0.5} fontWeight={500}>
                Nécessaires
              </Typography>
              <Typography level="body2" marginBottom={1}>
                Permet au site de fonctionner correctement.
              </Typography>
              <Switch
                size="lg"
                color="neutral"
                variant="soft"
                checked={true}
                disabled
              />
            </Box>
            <Box flex="1 0">
              <Typography marginBottom={0.5} fontWeight={500}>
                Statistiques
              </Typography>
              <Typography level="body2" marginBottom={1}>
                Permet de mesurer la fréquentation du site.
              </Typography>
              <Switch
                size="lg"
                color="neutral"
                variant="soft"
                checked={checkedAnalytics}
                onChange={(event) => setCheckedAnalytics(event.target.checked)}
              />
            </Box>
          </Box>

          <Divider sx={{ marginTop: 3, marginBottom: 4 }} />
        </>
      )}

      <Box display="flex" gap={1} marginTop={4}>
        <Button color="neutral" variant="soft" onClick={handleRefuseAll}>
          Refuser
        </Button>
        {!showSettings && (
          <Button
            color="neutral"
            variant="soft"
            onClick={() => setShowSettings(true)}
          >
            Paramétrer
          </Button>
        )}
        {showSettings && (
          <Button
            color="neutral"
            variant="soft"
            onClick={handleAcceptSelection}
          >
            Autoriser la sélection
          </Button>
        )}
        <Button
          color="neutral"
          onClick={handleAcceptAll}
          sx={{
            backgroundColor: "#262626",
            color: "#ffffff",
            border: "1px solid #ffffff",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#000000" },
            "&:active": { backgroundColor: "#474747" },
          }}
        >
          Tout autoriser
        </Button>
      </Box>
    </Box>
  );
};

export default CookieBanner;
