import FavoriteIcon from "@mui/icons-material/Favorite";
import StyleIcon from "@mui/icons-material/Style";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

export const DASHBOARD_ITEMS = [
  {
    icon: <FavoriteIcon sx={{ marginRight: 1 }} />,
    title: "Favoris",
    description:
      "Retrouvez la liste de tous les favoris que vous avez enregistré et accédez directement aux annonces correspondantes.",
    href: "/dashboard/favorites",
  },
  {
    icon: <StyleIcon sx={{ marginRight: 1 }} />,
    title: "Gérer mes annonces",
    description:
      "Activez ou déscativez une annonce en un clic, apportez des modifications ou supprimez une annonce définitivement.",
    href: "/dashboard/leases",
  },
  {
    icon: <EmailIcon sx={{ marginRight: 1 }} />,
    title: "Messages",
    description:
      "Présentez-vous et organisez une visite en échangeant avec l'auteur d'une annonce ou avec un locataire potentiel.",
    href: "/dashboard/messages",
  },
  {
    icon: <AccountCircleIcon sx={{ marginRight: 1 }} />,
    title: "Profil",
    description:
      "Complétez ou modifiez votre profil en renseignant vos coordonnées et une photo de profil. C'est pratique et sympa !",
    href: "/dashboard/profile",
  },
  {
    icon: <SettingsIcon sx={{ marginRight: 1 }} />,
    title: "Compte",
    description:
      "Changez votre adresse email, votre de mot de passe ou supprimez définitivement votre compte.",
    href: "/dashboard/account",
  },
];
