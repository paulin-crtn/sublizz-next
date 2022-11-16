/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/future/image";
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
  const [checkAnalytics, setCheckAnalytics] = useState<boolean>(true);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography
          marginRight={2}
          fontFamily="Bitter"
          fontSize="1.8rem"
          sx={{ color: "inherit" }}
        >
          Gestion des cookies
        </Typography>
        <Box sx={{ position: "relative", width: "60px", height: "40px" }}>
          <Image
            src="/img/cookie.png"
            alt="cookie"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      <Typography
        fontSize="1.1rem"
        fontWeight={300}
        marginTop={1}
        sx={{ color: "inherit" }}
      >
        Pour améliorer votre expérience utilisateur et mesurer l’audience de
        notre site, la carte des logements utilise des cookies.
      </Typography>

      <Divider sx={{ marginTop: 3, marginBottom: 2 }} />

      <Box display="flex">
        <Box marginRight={4}>
          <Typography
            marginBottom={1}
            fontWeight={500}
            sx={{ color: "inherit" }}
          >
            Nécessaires
          </Typography>
          <Switch
            size="lg"
            color="neutral"
            variant="soft"
            checked={true}
            disabled
          />
        </Box>
        <Box>
          <Typography
            marginBottom={1}
            fontWeight={500}
            sx={{ color: "inherit" }}
          >
            Statistiques
          </Typography>
          <Switch
            size="lg"
            color="neutral"
            variant="soft"
            checked={checkAnalytics}
            onChange={(event) => setCheckAnalytics(event.target.checked)}
          />
        </Box>
      </Box>

      <Divider sx={{ marginTop: 2, marginBottom: 3 }} />

      <Box display="flex" gap={1.5}>
        <Button color="neutral" variant="soft">
          Refuser
        </Button>
        <Button color="neutral" variant="soft">
          Autoriser la sélection
        </Button>
        <Button
          color="neutral"
          sx={{
            backgroundColor: "#262626",
            color: "#ffffff",
            border: "1px solid #ffffff",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#474747" },
          }}
        >
          Tout autoriser
        </Button>
      </Box>
    </Box>
  );
};

export default CookieBanner;
