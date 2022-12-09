"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Link from "next/link";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      className="container"
      component="main"
      width="85%"
      sx={{ "@media (max-width: 900px)": { width: "100%" } }}
    >
      <Typography component="h1" level="h2">
        Conditions Générales d'Utilisation
      </Typography>

      <Typography marginTop={4}>
        L’utilisation du présent site implique l’acceptation pleine et entière
        par l'utilisateur des conditions générales d’utilisation (CGU) décrites
        ci-après. Ces conditions d’utilisation sont susceptibles d’être
        modifiées ou complétées à tout moment.
      </Typography>
      <Typography marginTop={2}>
        Les présentes conditions générales d'utilisation remplacent expressément
        les contrats ou accords antérieurs de même nature ou ayant le même objet
        conclus avec le site lacartedeslogements.com ou ses représentants.
      </Typography>
      <Typography marginTop={2}>
        Date de dernière mise à jour : Novembre 2022.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Publics
      </Typography>
      <Typography marginTop={2}>
        La création d'un compte sur le site lacartedeslogements.com est
        exclusivement réservée aux personnes physiques majeures. Les personnes
        morales ne sont pas autorisées à créer un compte et utiliser les
        services du présent site. Cela concerne particulièrement, mais pas
        uniquement : les agences immobilières, les mandataires, les SCI et SCPI.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Descriptif du service
      </Typography>
      <Typography marginTop={2}>
        Le site lacartedeslogements.com a pour objet de mettre en relation des
        particuliers afin de faciliter la location ou la sous-location, avec
        l'accord du propriétaire, d'un bien immobilier. À ce titre le site
        permet la publication d'annonce immobilière.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Création d'un compte
      </Typography>
      <Typography marginTop={2}>
        Si vous souhaitez créer un compte sur le site lacartedeslogements.com,
        vous devez accepter les Conditions Générales d’Utilisation.
      </Typography>
      <Typography marginTop={2}>
        Vous devez veiller à choisir un mot de passe « fort », c'est à dire qui
        contient au moins 8 caractères et 4 types différents : des minuscules,
        des majuscules, des chiffres et des caractères spéciaux.
      </Typography>
      <Typography marginTop={2}>
        Pour éviter les piratages en cascade, votre compte doit avoir un mot de
        passe propre et unique. Vous ne devez pas choisir un mot de passe que
        vous utilisez déjà pour un autre compte.
      </Typography>
      <Typography marginTop={2}>
        Vous pourrez modifier votre mot de passe à tout moment depuis votre
        espace personnel. Vous devez informer immédiatement
        lacartedeslogements.com de toute perte ou utilisation non autorisée de
        votre compte, de vos identifiants et mot de passe. Les mots de passe et
        identifiants sont personnels et vous vous engagez à ne pas les
        divulguer. A ce titre, vous êtes responsable de l'utilisation de votre
        compte et de vos identifiants et mots de passe.
      </Typography>
      <Typography marginTop={2}>
        Toute tentative de substitution de mot de passe ou d'identifiant d'un
        autre utilisateur est strictement interdite.
      </Typography>
      <Typography marginTop={2}>
        Vous vous engagez à ne faire aucune action qui pourrait aider toute
        personne qui n'est pas un membre inscrit à accéder à une zone sécurisée
        du site, et vous acceptez de ne pas créer des comptes additionnels dans
        le but d'abuser du fonctionnement du site ou d'autres membres inscrits,
        ou de chercher à vous faire passer pour un autre membre inscrit.
      </Typography>
      <Typography marginTop={2}>
        Lorsque vous vous authentifiez à notre site avec vos identifiants vous
        restez authentifié pendant 1 semaine.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Publication d'une annonce
      </Typography>

      <Typography marginTop={2} fontWeight={500}>
        Les annonces présentes sur le site lacartedeslogements.com ne sont pas
        vérifiées.
      </Typography>

      <Typography id="host" component="h3" level="h5" marginTop={4}>
        Fonctionnement
      </Typography>
      <Typography marginTop={2}>
        Pour pouvoir publier une annonce il est nécessaire que l'utilisateur
        dispose d'un compte actif.
      </Typography>
      <Typography marginTop={2}>
        La publication d'une annonce s'effectue en remplissant les champs du
        formulaire disponible dans l'espace personnel de l'utilisateur.
        L'utilisateur devra alors renseigner les informations concernant le
        logement, dont notamment l'adresse du logement. C'est à partir de cette
        adresse que les coordonnées du logement sont récupérées. Ces coordonnées
        servent à afficher l'emplacement du logement sur la carte interactive.
      </Typography>

      <Typography id="host" component="h3" level="h5" marginTop={4}>
        Limitations
      </Typography>
      <Typography marginTop={2}>
        Seul les biens immobiliers disponibles sur le sol français, à usage
        d'habitation et répondants aux normes en vigueur peuvent faire l'objet
        d'une publication sur le site lacartedeslogements.com.
      </Typography>
      <Typography marginTop={2}>
        L'éditeur se réserve le droit de supprimer toute annonce qui ne
        concernerait pas la location ou la sous-location d'un bien immobilier ou
        toute annonce immobilière qui ne répondrait pas aux exigences légales,
        aux bonnes moeurs ou qui apparaitrait comme fausse ou trompeuse.
      </Typography>
      <Typography marginTop={2}>
        Ces suppressions pourront intervenir sans préavis ou information
        préalable et ne pourront donner droit à une quelconque indemnisation ou
        compensation.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Modération
      </Typography>
      <Typography marginTop={2}>
        Un utilisateur connecté peut signaler une annonce qui apparaitrait non
        conforme ou contraire à la morale via le formulaire accessible sur la
        page de l'annonce. Il peut s'agir notamment mais pas exclusivement
        d'annonce dont le bien immobilier est insalubre ou impropre à
        l'habitation. L'éditeur ainsi notifié pourra décider de supprimer ou non
        l'annonce du site lacartedeslogements.com.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Suppression d'un compte
      </Typography>
      <Typography marginTop={2}>
        Un utilisateur peut supprimer son compte à tout moment.
      </Typography>
      <Typography marginTop={2}>
        Le site lacartedeslogements.com se réserve le droit de supprimer le
        compte d'un utilisateur à tout moment sans préavis ou information
        préalable et sans compensation ou indemnisation.
      </Typography>
      <Typography marginTop={2}>
        Cette suppression peut notamment intervenir lorsque l'utilisateur
        utilise ou est suspecté d'utiliser de manière frauduleuse le site
        internet ou de nuire à son image.
      </Typography>
      <Typography marginTop={2}>
        L'adresse email et l'adresse IP de l'utilisateur pourront être bloquées
        afin d'empêcher toute nouvelle inscription. Le site
        lacartedeslogements.com se reserve le droit d'entreprendre des
        poursuites judiciaires si necessaire.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Prix
      </Typography>
      <Typography marginTop={2}>
        Le site lacartedeslogements.com et ses services sont gratuits car le
        développement du site est issu d'un projet personnel et que l'éditeur
        l'héberge avec des offres gratuites. Cependant des limitations
        s'appliquent, notamment concernant le nombre d'annonces et de photos
        qu'il est possible de publier.
      </Typography>
      <Typography marginTop={2}>
        Actuellement les limites sont fixées à : 1 compte par personne, 2
        annonces par compte et 4 photos par annonce. Ces limites peuvent être
        amenées à changer sans préavis.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Propriété des contenus publiés
      </Typography>
      <Typography marginTop={2}>
        L'utilisateur du site lacartedeslogements.com n'est autorisé à publier
        une annonce immobilière que s'il dispose de la jouissance du bien pour
        lequel il publie l'annonce.
      </Typography>
      <Typography marginTop={2}>
        L'utilisateur s'engage à publier une annonce conforme aux
        caractéristiques du logement et à mettre en ligne uniquement des photos
        en lien avec le logement à louer ou à sous-louer et dont il possède les
        droits.
      </Typography>
      <Typography marginTop={2}>
        L'utilisateur à la stricte interdiction d’introduire dans le site
        lacartedeslogements.com ou à partir de celui-ci, de façon volontaire ou
        autrement, des informations ou des éléments qui pourraient nuire au
        fonctionnement de ce site internet ou à ses utilisateurs.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Responsabilité et limitation de responsabilité
      </Typography>

      <Typography marginTop={2} fontWeight={500}>
        Les annonces présentes sur le site lacartedeslogements.com ne sont pas
        vérifiées.
      </Typography>

      <Typography id="host" component="h3" level="h5" marginTop={4}>
        Disponibilités et garanties
      </Typography>
      <Typography marginTop={2}>
        Le site lacartedeslogements.com et les services qu'il contient relèvent
        d'une obligation de moyens. Certains de ces services peuvent être amenés
        à évoluer ou à être supprimés. Nous ne pouvons pas garantir la
        disponibilité de ces services ni leur parfaite adéquation à vos besoins.
        Nous fournissons ces services « en l'état ».
      </Typography>
      <Typography marginTop={2}>
        En aucun cas l’éditeur n’entend représenter ou garantir le fait que le
        site lacartedeslogements.com est fonctionnel, est sans erreur ou qu’il
        sera possible d’y accéder sans interruption ou qu’aucun virus ou autre
        élément contaminant ou destructeur ne sera transmis ou qu’aucun dommage
        ne sera occasionné à votre système informatique. Il est de la
        responsabilité de l'utilisateur de prendre les précautions requises ou
        de se renseigner auprès d’un consultant en informatique.
      </Typography>
      <Typography marginTop={2}>
        Il est précisé qu’à des fins de maintenance, de mise à jour, et pour
        toute autre raison notamment d’ordre technique, l’accès au site pourrait
        être interrompu. L'éditeur n’est en aucun cas responsable de ces
        interruptions et des conséquences qui peuvent en découler pour
        l’internaute.
      </Typography>

      <Typography id="host" component="h3" level="h5" marginTop={4}>
        Obligation de vigilance de l'utilisateur
      </Typography>
      <Typography marginTop={2}>
        Il revient à l'utilisateur de faire preuve de vigilance lors de
        l'utilisation du site lacartedeslogements.com et de ses services. Le
        propriétaire du site lacartedeslogements.com ne peut être tenu
        responsable de l'utilisation qui est faite par l'utilisateur du présent
        site internet et de ses services.
      </Typography>
      <Typography marginTop={2}>
        L'échange entre particuliers peut comporter une part de risque et il
        revient à l'utilisateur d'en tenir compte lors de ses échanges et de ses
        démarches. Par exemple il convient de ne jamais verser d'argent avant la
        signature d'un bail ou d'un contrat.
      </Typography>
      <Typography marginTop={2}>
        L'organisation des visites, le choix du locataire ou du sous-locataire,
        la rédaction et la signature de tout contrat ou bail est de la
        responsabilité des utilisateurs. Le site lacartedeslogements.com se
        limite exclusivement à la mise en relation entre particuliers.
      </Typography>
      <Typography marginTop={2}>
        Aucune indemnisation ou compensation, de quelle que sorte que ce soit,
        ne pourra être réclamée au propriétaire du site et ce, quel que soit la
        nature ou le montant du préjudice subi ou supposé.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Propriété intellectuelle et contrefaçon
      </Typography>
      <Typography marginTop={2}>
        L’éditeur du site lacartedeslogements.com est propriétaire des droits de
        propriété intellectuelle ou détient les droits d’usage sur tous les
        éléments accessibles sur le site, notamment les textes, images,
        graphismes, logo, icônes, sons, etc.
      </Typography>
      <Typography marginTop={2}>
        Toute reproduction, représentation, modification, publication,
        adaptation totale ou partielle des éléments du site, quel que soit le
        moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
        préalable.
      </Typography>
      <Typography marginTop={2}>
        Toute exploitation non autorisée du site ou de l’un quelconque de ces
        éléments qu’il contient sera considérée comme constitutive d’une
        contrefaçon et poursuivie conformément aux dispositions des articles
        L.335-2 et suivants du Code de Propriété Intellectuelle.
      </Typography>

      <Typography component="h2" level="h4" marginTop={4}>
        Droit applicable – Litiges – Traitement des réclamations - Médiation
      </Typography>
      <Typography marginTop={2}>
        Droit applicable : Le présent contrat est soumis à la loi française. La
        langue du présent contrat est la langue française. En cas de litige les
        tribunaux français seront seuls compétents.
      </Typography>
      <Typography marginTop={2}>
        Traitement des réclamations : Pour toute réclamation vous pouvez
        contacter l'éditeur du site via le formulaire disponible sur la page des
        mentions légales.
      </Typography>
      <Link href="/legal/notice">
        <Button sx={{ mt: 2 }}>Mentions légales</Button>
      </Link>
      <Typography marginTop={2}>
        À défaut de résolution amiable, le Tribunal de Commerce de Bordeaux sera
        seul compétent pour tout litige relatif à l’interprétation et
        l’exécution des présentes conditions générales d'utilisation.
      </Typography>
    </Box>
  );
}
