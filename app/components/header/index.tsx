/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Link from "next/link";
import Image from "next/image";
/* ------------------------------- COMPONENTS ------------------------------- */
import InputCitySearch from "../../shared/input-city-search";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import FormHelperText from "@mui/joy/FormHelperText";
import Chip from "@mui/joy/Chip";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
/* -------------------------------- CONSTANTS ------------------------------- */
import homeImg from "../../../public/img/home.jpg";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Header = () => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <header>
      <Card sx={{ "--Card-radius": "0px" }}>
        <CardCover>
          <Image
            src={homeImg}
            alt="Picture of a parisian appartment"
            placeholder="blur"
          />
        </CardCover>
        <CardCover sx={{ background: "rgba(0, 0, 0, 0.3)" }} />
        <CardContent
          sx={{
            marginY: 12,
            marginX: "auto",
            textAlign: "center",
            "@media (max-width: 1100px)": { marginY: 4 },
          }}
        >
          <Box>
            <Typography
              component="h1"
              level="h1"
              fontSize="2.4rem"
              fontWeight={800}
              lineHeight={1.2}
              sx={{
                color: "#ffffff",
                "@media (max-width: 1100px)": {
                  fontSize: "2rem",
                },
              }}
            >
              Annonces de locations entre particuliers
            </Typography>
            <Typography
              component="h2"
              level="h4"
              marginTop={1}
              marginX="auto"
              fontWeight={400}
              sx={{
                color: "#ffffff",
                "@media (max-width: 1100px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              Faites des économies en louant un bien immobilier sans frais
              d'agence
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
              gap={1}
              width="fit-content"
              marginX="auto"
              marginTop={2}
            >
              <Chip
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  userSelect: "none",
                }}
              >
                Bail mobilité
              </Chip>
              <Chip
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  userSelect: "none",
                }}
              >
                Bail étudiant
              </Chip>
              <Chip
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  userSelect: "none",
                }}
              >
                Colocation
              </Chip>
              <Chip
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  userSelect: "none",
                }}
              >
                Sous-location
              </Chip>
            </Box>
          </Box>
          <Box
            sx={{
              width: "600px",
              marginX: "auto",
              marginTop: 6,
              "@media (max-width: 900px)": {
                width: "100%",
                paddingX: 3,
              },
            }}
          >
            <InputCitySearch isLarge={true} />
            <Link href="/leases">
              <FormHelperText
                sx={{
                  justifyContent: "flex-end",
                  mt: 2,
                  cursor: "pointer",
                  color: "#ffffff",
                  fontWeight: 500,
                  "@media (max-width: 1100px)": {},
                }}
              >
                Voir toutes les annonces
              </FormHelperText>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
