import FavoriteIcon from "@mui/icons-material/Favorite";
import StyleIcon from "@mui/icons-material/Style";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

export const DASHBOARD_ITEMS = [
  {
    icon: <FavoriteIcon />,
    title: "Favoris",
    description: "Pour retrouver tous les favoris que vous avez enregistré.",
    href: "/dashboard/favorites",
  },
  {
    icon: <StyleIcon />,
    title: "Gérer mes annonces",
    description: "Pour activer, désactiver, modifier ou supprimer une annonce.",
    href: "/dashboard/leases",
  },
  {
    icon: <EmailIcon />,
    title: "Messages",
    description: "Pour échanger avec d'autres utilisateurs.",
    href: "/dashboard/messages",
  },
  {
    icon: <PersonIcon />,
    title: "Profil",
    description:
      "Pour mettre à jour de vos coordonnées, votre photo de profil, etc.",
    href: "/dashboard/profile",
  },
  {
    icon: <SettingsIcon />,
    title: "Compte",
    description: "Pour changer d'adresse email ou de mot de passe.",
    href: "/dashboard/account",
  },
];
