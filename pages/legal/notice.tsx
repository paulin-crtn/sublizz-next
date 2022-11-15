/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { NextPage } from "next/types";
import Head from "next/head";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Button from "@mui/joy/Button";
import Link from "next/link";
import Alert from "@mui/joy/Alert";
import Card from "@mui/joy/Card";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const NoticePage: NextPage = () => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>Mentions légales | lacartedeslogements</title>
        <meta
          name="description"
          content="Mentions légales du site la carte des logements. Annonces de location et de sous-locations immobilières entre particuliers."
        />
      </Head>

      <Box component="main">
        <Typography component="h1" level="h2">
          Mentions légales
        </Typography>

        <Box display="flex" gap={6} marginTop={6} position="relative">
          <Alert
            sx={{
              flex: "0 0 300px",
              alignSelf: "flex-start",
              position: "sticky",
              top: "120px",
            }}
          >
            <List
              component="ol"
              aria-label="basic-list"
              sx={{ fontWeight: 500 }}
            >
              <ListItem>
                <Link href="#editor">Éditeur</Link>
              </ListItem>
              <ListItem>
                <Link href="#host">Hébergeurs</Link>
              </ListItem>
            </List>
          </Alert>

          <Box component="section" flex="1 1">
            <Typography>
              Conformément aux dispositions des articles 6-III et 19 de la Loi
              n° 2004-575 du 21 juin 2004 pour la Confiance dans l’économie
              numérique, dite L.C.E.N., nous portons à la connaissance des
              utilisateurs et visiteurs du site lacartedeslogements.com les
              informations suivantes.
            </Typography>

            <Typography id="editor" component="h2" level="h4" marginTop={3}>
              1. Éditeur
            </Typography>
            <Typography marginTop={1}>
              Le site lacartedeslogements.com est la propriété exclusive de
              Paulin CARATINI, agissant également sous le nom commercial «
              Haftwald », qui l’édite.
            </Typography>
            <Typography marginTop={1}>
              Haftwald est une micro-entreprise immatriculée sous le numéro
              SIRET 819 156 910 00021.
            </Typography>
            <Button sx={{ mt: 2 }}>Contacter l’éditeur</Button>

            <Typography id="host" component="h2" level="h4" marginTop={3}>
              2. Hébergeurs
            </Typography>
            <Typography marginTop={1}>
              Le site lacartedeslogements.com est hébergé sur différents
              services.
            </Typography>

            <Box display="flex" gap={2} marginTop={2}>
              <Card
                variant="outlined"
                sx={{ flex: "1 1 150px", boxShadow: "none" }}
              >
                <Typography level="h6">Vercel</Typography>
                <Typography level="body2">Front-end</Typography>
                <Typography marginTop={1}>
                  340 S Lemon Ave #4133
                  <br />
                  Walnut, CA 91789
                  <br />
                  United States
                </Typography>
                <a
                  href="https://vercel.com/contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button sx={{ mt: 2 }}>Contacter Vercel</Button>
                </a>
              </Card>
              <Card
                variant="outlined"
                sx={{ flex: "1 1 150px", boxShadow: "none" }}
              >
                <Typography level="h6">Heroku</Typography>
                <Typography level="body2">Back-end</Typography>
                <Typography marginTop={1}>
                  415 Mission Street
                  <br />
                  Suite 300
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </Typography>
                <a
                  href="https://www.heroku.com/contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button sx={{ mt: 2 }}>Contacter Heroku</Button>
                </a>
              </Card>
              <Card
                variant="outlined"
                sx={{ flex: "1 1 150px", boxShadow: "none" }}
              >
                <Typography level="h6">Supabase</Typography>
                <Typography level="body2">Database & storage</Typography>
                <Typography marginTop={1}>
                  970 Toa Payoh North #07-04
                  <br />
                  Singapore, Central Singapore
                  <br />
                  318992, Singapore
                </Typography>
                <a
                  href="https://supabase.com/support"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button sx={{ mt: 2 }}>Contacter Supabase</Button>
                </a>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NoticePage;
