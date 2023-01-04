"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import ModalLayout from "../../shared/modal-layout";
import ContactEditor from "../../shared/contact-editor";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openContactEditor, setOpenContactEditor] = useState<boolean>(false);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Box
        className="container"
        component="main"
        width="85%"
        sx={{ "@media (max-width: 900px)": { width: "100%" } }}
      >
        <Typography component="h1" level="h2">
          Mentions légales
        </Typography>
        <Typography marginTop={4}>
          Conformément aux dispositions des articles 6-III et 19 de la Loi n°
          2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique,
          dite L.C.E.N., nous portons à la connaissance des utilisateurs et
          visiteurs du site lacartedeslogements.com les informations suivantes.
        </Typography>

        <Typography component="h2" level="h4" marginTop={4}>
          Éditeur
        </Typography>
        <Typography marginTop={2}>
          Le site lacartedeslogements.com est la propriété exclusive de Paulin
          CARATINI, entrepreneur individuel agissant également sous le nom
          commercial « Haftwald », qui l’édite.
        </Typography>
        <Typography marginTop={2}>
          <a href="https://haftwald.com" target="_blank" rel="noreferrer">
            Haftwald
          </a>{" "}
          est une micro-entreprise domiciliée au 10 rue Succursale 33000
          Bordeaux et immatriculée sous le numéro SIRET 819 156 910 00021.
        </Typography>
        <Button
          variant="soft"
          onClick={() => setOpenContactEditor(true)}
          sx={{ mt: 2 }}
        >
          Contacter l’éditeur
        </Button>

        <Typography component="h2" level="h4" marginTop={4}>
          Hébergeurs
        </Typography>
        <Typography marginTop={2}>
          Le site lacartedeslogements.com est hébergé par différents services.
        </Typography>

        <Box
          display="flex"
          gap={2}
          marginTop={2}
          sx={{ "@media (max-width: 800px)": { display: "block" } }}
        >
          <Card
            variant="outlined"
            sx={{ flex: "1 1 150px", mb: 2, boxShadow: "none" }}
          >
            <Typography level="h6">Amazon Web Services</Typography>
            <Typography level="body2">
              Back-End, Base de données & Stockage
            </Typography>
            <Typography marginTop={2}>
              38 avenue John F. Kennedy
              <br />
              L 1855
              <br />
              99137 Luxembourg
            </Typography>
            <a
              href="https://aws.amazon.com/fr/contact-us/"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="soft" sx={{ mt: 2 }}>
                Contacter AWS
              </Button>
            </a>
          </Card>
          <Card
            variant="outlined"
            sx={{ flex: "1 1 150px", mb: 2, boxShadow: "none" }}
          >
            <Typography level="h6">Vercel</Typography>
            <Typography level="body2">Front-End</Typography>
            <Typography marginTop={2}>
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
              <Button variant="soft" sx={{ mt: 2 }}>
                Contacter Vercel
              </Button>
            </a>
          </Card>
        </Box>

        <Typography component="h2" level="h4" marginTop={4}>
          Crédits
        </Typography>
        <Typography marginTop={2}>Photos et illustrations.</Typography>
        <Box marginTop={2}>
          <a
            href="https://www.pexels.com/fr-fr/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="soft" sx={{ mr: 1 }}>
              Pexels
            </Button>
          </a>
          <a
            href="https://undraw.co/illustrations"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="soft" sx={{ mr: 1 }}>
              unDraw
            </Button>
          </a>
          <a
            href="https://fr.freepik.com/auteur/vectorjuice"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="soft" sx={{ mr: 1 }}>
              vectorjuice
            </Button>
          </a>
        </Box>
      </Box>

      {/** Contact Editor */}
      <Modal
        open={openContactEditor}
        onClose={() => setOpenContactEditor(false)}
      >
        <ModalDialog size="lg" aria-labelledby="contact-editor">
          <ModalClose />
          <ModalLayout title="Contacter l'éditeur">
            <ContactEditor setOpenContactEditor={setOpenContactEditor} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </>
  );
}
