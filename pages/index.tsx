/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { NextPage } from "next";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
// import styles from '../styles/Home.module.css'

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = () => {
  return (
    <div>
      <header>
        <h1>Locations et sous-locations temporaires entre particuliers</h1>
        <h2>
          Concrétisez vos projets en découvrant nos offres de locations de
          courtes durées sans frais d’agence.
        </h2>
        <FormControl>
          <FormLabel>Dans quelle ville cherches-tu ?</FormLabel>
          <Input placeholder="Lyon" />
          <FormHelperText>Voir toutes les annonces</FormHelperText>
        </FormControl>
      </header>
    </div>
  );
};

export default Home;
