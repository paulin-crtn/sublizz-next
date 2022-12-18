/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import CookieIcon from "@mui/icons-material/Cookie";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CookiePreference = ({
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
        component="p"
        letterSpacing={0}
        sx={{
          marginBottom: 3,
          fontSize: "1.9rem",
          fontWeight: 600,
          letterSpacing: 0,
          cursor: "pointer",
          whiteSpace: "nowrap",
          color: "#ffffff",
        }}
      >
        lacartedeslogements
      </Typography>
      <Typography
        marginBottom={2}
        fontWeight={500}
        fontSize="1.3rem"
        startDecorator={<CookieIcon />}
        sx={{ "--Typography-gap": "8px" }}
      >
        Gestion des cookies
      </Typography>
      <Typography fontWeight={300} sx={{ color: "inherit" }}>
        Pour améliorer votre expérience utilisateur et mesurer l’audience de
        notre site, le site lacartedeslogements.com utilise des cookies.
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

      <Box marginTop={4} display="flex" gap={1}>
        <Button color="neutral" variant="outlined" onClick={handleRefuseAll}>
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
            sx={{ whiteSpace: "nowrap" }}
          >
            Autoriser la sélection
          </Button>
        )}
        <Button
          color="neutral"
          onClick={handleAcceptAll}
          fullWidth
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            fontWeight: 500,
            whiteSpace: "nowrap",
            "&:hover": { backgroundColor: "#eeeeee" },
            "&:active": { backgroundColor: "#eeeeee" },
          }}
        >
          Tout autoriser
        </Button>
      </Box>
    </Box>
  );
};

export default CookiePreference;
