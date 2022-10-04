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
import Image from "next/image";
import styles from "../styles/Home.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.headLines}>
          <Typography component="h1" level="h2">
            Locations et sous-locations temporaires entre particuliers
          </Typography>
          <Typography component="h2" level="h4" marginTop={2} fontWeight={300}>
            Concrétisez vos projets en découvrant nos offres de locations de
            courtes durées sans frais d’agence.
          </Typography>
        </div>

        <Card sx={{ height: "300px" }}>
          <CardCover>
            <Image
              src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
              layout="fill"
            />
          </CardCover>
          <CardContent>
            <FormControl>
              <FormLabel>Dans quelle ville cherches-tu ?</FormLabel>
              <Input placeholder="Lyon" />
              <FormHelperText>Voir toutes les annonces</FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </header>
      <main>
        <LeaseCard></LeaseCard>
      </main>
    </div>
  );
};

export default Home;
