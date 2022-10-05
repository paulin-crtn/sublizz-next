/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { NextPage } from "next";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { LeaseCard } from "../components";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Image from "next/future/image";
import styles from "../styles/Home.module.css";
import homePic from "../public/img/home.jpg";
import { Button } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.headLines}>
          <Typography component="h1" level="h1" fontFamily="Yeseva One">
            <span className={styles.textGradient1}>Locations</span> et{" "}
            <span className={styles.textGradient2}>sous-locations</span>{" "}
            temporaires entre particuliers
          </Typography>
          <Typography component="h2" level="h4" marginTop={2} fontWeight={300}>
            Réalisez vos projets en découvrant nos offres de locations de
            courtes durées sans frais d’agence 🙌
          </Typography>
        </div>

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
              <Typography level="h4">
                Dans quelle ville cherchez-vous ?
              </Typography>
              <div className={styles.search}>
                <Input size="lg" placeholder="Lyon" sx={{ width: "300px" }} />
                <Button size="lg" sx={{ ml: "5px", borderRadius: "8px" }}>
                  <SearchIcon />
                </Button>
              </div>
              <FormHelperText sx={{ cursor: "pointer" }}>
                Voir toutes les annonces
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
          fontFamily="Yeseva One"
        >
          Dernières annonces publiées
        </Typography>
      </main>
    </div>
  );
};

export default Home;
