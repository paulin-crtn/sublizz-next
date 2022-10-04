/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { NextPage } from "next";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import { LeaseCard } from "../components";
// import styles from '../styles/Home.module.css'

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = () => {
  return (
    <div>
      <header>
        <Typography level="h1">
          Locations et sous-locations temporaires entre particuliers
        </Typography>
        <Typography level="h2">
          Concrétisez vos projets en découvrant nos offres de locations de
          courtes durées sans frais d’agence.
        </Typography>
        <FormControl>
          <FormLabel>Dans quelle ville cherches-tu ?</FormLabel>
          <Input placeholder="Lyon" />
          <FormHelperText>Voir toutes les annonces</FormHelperText>
        </FormControl>
      </header>
      <main>
        <LeaseCard></LeaseCard>
      </main>
    </div>
  );
};

export default Home;
