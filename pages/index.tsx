/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { NextPage } from "next";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Image from "next/future/image";
import styles from "../styles/Home.module.css";
import homePic from "../public/img/home.jpg";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = () => {
  return (
    <>
      <header>
        <div className={styles.headLines}>
          <Typography
            component="h1"
            level="h1"
            fontFamily="Bitter"
            fontSize={48}
            fontWeight={800}
            lineHeight={1.2}
          >
            <span className={styles.textGradient1}>Locations</span> et{" "}
            <span className={styles.textGradient2}>sous-locations</span>{" "}
            temporaires entre particuliers
          </Typography>
          <Typography component="h2" level="h5" marginTop={2} fontWeight={300}>
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
              <FormHelperText>
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
      </main>
    </>
  );
};

export default Home;
