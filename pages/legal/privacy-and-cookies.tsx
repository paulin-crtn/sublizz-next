/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const PrivacyPage: NextPage = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  TEMPLATE                                  */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Head>
        <title>
          Politique de confidentialité & Cookies | lacartedeslogements
        </title>
        <meta
          name="description"
          content="Politique de confidentialité et des cookies du site la carte des logements. Annonces de location et de sous-locations de particulier à particulier."
        />
      </Head>
      <Box component="main" width="85%">
        <Typography component="h1" level="h2">
          Politique de confidentialité & Cookies
        </Typography>

        <Typography component="h2" level="h4" marginTop={4}>
          Données personnelles
        </Typography>

        <Typography marginTop={2}>
          Les données personnelles sont notamment protégées par la loi n° 78-87
          du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l’article L.
          226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
        </Typography>

        <Typography component="h3" level="h5" marginTop={4}>
          Données collectées et finalités
        </Typography>

        <Typography marginTop={2}>
          Sur le site lacartedeslogements.com, le propriétaire du site collecte
          certaines informations personnelles relatives à l’utilisateur afin de
          pouvoir procéder à l'inscription de ce dernier et lui faire bénéficier
          des services proposés sur le site lacartedeslogements.com.
        </Typography>
        <Typography marginTop={2}>
          Les informations nominatives requises sont notamment : le prénom et
          l’adresse email de l’utilisateur. Sans ces informations, il sera
          impossible de donner suite à l'inscription.
        </Typography>
        <Typography marginTop={2} fontWeight={500}>
          L’utilisateur fournit ces informations en toute connaissance de cause,
          notamment lorsqu’il procède par lui-même à leur saisie.
        </Typography>

        <Typography id="host" component="h3" level="h5" marginTop={4}>
          Durée et lieux de conservation des données
        </Typography>

        <Typography marginTop={2}>
          Les données sont conservées aussi longtemps que l'utilisateur conserve
          son compte actif. Lorsque le compte est supprimée, les données de
          l'utilisateur le sont également. Les données sont enregistrées dans
          une base de données mise à disposition par l'entreprise Supabase. Les
          coordonnées de cette entreprise sont disponibles sur la page des
          mentions légales.
        </Typography>

        <Link href="/legal/notice">
          <Button sx={{ mt: 2 }}>Mentions légales</Button>
        </Link>

        <Typography marginTop={2} fontWeight={500}>
          Aucune information personnelle de l’utilisateur du site
          lacartedeslogements.com n’est publiée à l’insu de l’utilisateur,
          échangée, transférée, cédée ou vendue sur un support quelconque à des
          tiers. Seul les administrateurs du site lacartedeslogements.com et les
          hébergeurs du site lacartedeslogements.com peuvent avoir accès aux
          informations des utilisateurs.
        </Typography>

        <Typography id="host" component="h3" level="h5" marginTop={4}>
          Délégué à la protection des données
        </Typography>

        <Typography marginTop={2}>
          Conformément aux dispositions des articles 38 et suivants de la loi
          78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux
          libertés, tout utilisateur dispose d’un droit d’accès, de
          rectification, de suppression et d’opposition aux données personnelles
          le concernant. Pour l’exercer, l’utilisateur doit contacter l’éditeur
          du site dont les coordonnées sont disponibles sur la page des mentions
          légales.
        </Typography>

        <Link href="/legal/notice">
          <Button sx={{ mt: 2 }}>Mentions légales</Button>
        </Link>

        <Typography id="host" component="h2" level="h4" marginTop={4}>
          Cookies
        </Typography>

        <Typography marginTop={2}>
          L’utilisateur est informé que lors de ses visites sur le site
          lacartedeslogements.com, un ou des cookies sont susceptibles de
          s’installer automatiquement sur son ordinateur, sa tablette ou son
          smartphone.
        </Typography>

        <Typography id="host" component="h3" level="h5" marginTop={4}>
          Définition
        </Typography>

        <Typography marginTop={2}>
          Un cookie est un fichier de petite taille, qui ne permet pas
          l’identification de l’utilisateur, mais qui enregistre des
          informations relatives à la navigation d’un ordinateur sur un site.
          Les données ainsi obtenues visent à faciliter la navigation ultérieure
          sur le site, et ont également vocation à permettre diverses mesures de
          fréquentation.
        </Typography>

        <Typography id="host" component="h3" level="h5" marginTop={4}>
          Cookies techniques
        </Typography>

        <Typography marginTop={2}>
          Le site lacartedeslogements.com utilise des cookies techniques. Ces
          cookies sont indispensables au bon fonctionnement du site internet.
          Exemple de cookie technique : savoir si vous êtes connecté ou non à
          votre espace client.
        </Typography>

        <Typography id="host" component="h3" level="h5" marginTop={4}>
          Cookies analytiques
        </Typography>

        <Typography marginTop={2}>
          Le site lacartedeslogements.com utilise des cookies analytiques. Ces
          cookies permettent de recueillir des données relatives à votre
          utilisation du site lacartedeslogements.com afin d’améliorer la
          performance et la conception de celui-ci. Ces cookies peuvent être
          fournis par un fournisseur d’outil analytique de tierce partie, mais
          ne sont utilisés qu’à des fins liées au site lacartedeslogements.com.
        </Typography>

        <Typography id="host" component="h3" level="h5" marginTop={4}>
          Suppression des cookies
        </Typography>

        <Typography marginTop={2}>
          La consulation et le paramétrage du logiciel de navigation permet
          d’informer de la présence de cookies et éventuellement de les
          supprimer de la manière suivante :
        </Typography>

        <Box marginTop={2}>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noreferrer"
          >
            <Button sx={{ mr: 1 }}>Chrome</Button>
          </a>
          <a
            href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
            target="_blank"
            rel="noreferrer"
          >
            <Button sx={{ mr: 1 }}>Firefox</Button>
          </a>
          <a
            href="https://support.apple.com/kb/PH17191?viewlocale=fr_FR"
            target="_blank"
            rel="noreferrer"
          >
            <Button sx={{ mr: 1 }}>Safari</Button>
          </a>
          <a
            href="https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
            target="_blank"
            rel="noreferrer"
          >
            <Button>Edge</Button>
          </a>
        </Box>

        <Typography marginTop={2}>
          Le refus d’installation d’un cookie peut entraîner l’impossibilité
          d’accéder à certains services.
        </Typography>
      </Box>
    </>
  );
};

export default PrivacyPage;
