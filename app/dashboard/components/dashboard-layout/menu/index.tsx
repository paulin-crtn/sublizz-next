/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import ModalLayout from "../../../../shared/modal-layout";
import HelpUs from "../../help-us";
/* ----------------------------------- MUI ---------------------------------- */
import { Theme } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
/* ---------------------------------- ICONS --------------------------------- */
import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodIcon from "@mui/icons-material/Mood";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../../../../const/toastStyle";
import { UserRoleEnum } from "../../../../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */
const navListStyle = (theme: Theme) => ({
  margin: "5px 0",
  borderRadius: "5px",
  cursor: "pointer",
  "& p": {
    padding: "10px 15px",
  },
  "&:hover": {
    backgroundColor: "#32313c",
  },
  "&.active": {
    backgroundColor: "#32313c",
    "& p": {
      color: "#ffffff",
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Menu = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user, logout } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const pathname = usePathname();

  /* -------------------------------- FUNCTION -------------------------------- */
  const isActive = (key: string) => {
    const pathArr = pathname ? pathname.split("/") : [];
    // Dashboard
    if (pathArr[1] === key && pathArr.length === 2) {
      return "active";
    }
    // Other Navigation
    if (pathArr[2] === key) {
      return "active";
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box component="nav">
      <ul>
        <Box component="li" sx={navListStyle} className={isActive("dashboard")}>
          <Link href="/dashboard">
            <Typography startDecorator={<HomeIcon sx={{ marginRight: 1 }} />}>
              Tableau de bord
            </Typography>
          </Link>
        </Box>

        {user?.role === UserRoleEnum.OWNER && (
          <Box component="li" sx={navListStyle} className={isActive("leases")}>
            <Link href="/dashboard/leases">
              <Typography
                startDecorator={<StyleIcon sx={{ marginRight: 1 }} />}
              >
                Gérer mes annonces
              </Typography>
            </Link>
          </Box>
        )}

        {user?.role === UserRoleEnum.SEEKER && (
          <Box
            component="li"
            sx={navListStyle}
            className={isActive("favorites")}
          >
            <Link href="/dashboard/favorites">
              <Typography
                startDecorator={<FavoriteIcon sx={{ marginRight: 1 }} />}
              >
                Favoris
              </Typography>
            </Link>
          </Box>
        )}

        <Box component="li" sx={navListStyle} className={isActive("profile")}>
          <Link href="/dashboard/profile">
            <Typography
              startDecorator={<AccountCircleIcon sx={{ marginRight: 1 }} />}
            >
              Profil
            </Typography>
          </Link>
        </Box>

        <Box component="li" sx={navListStyle} className={isActive("account")}>
          <Link href="/dashboard/account">
            <Typography
              startDecorator={<SettingsIcon sx={{ marginRight: 1 }} />}
            >
              Compte
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Box
          component="li"
          sx={navListStyle}
          onClick={() => {
            logout(() => {
              router.push("/");
              toast.success(`À bientôt ${user?.firstName}`, {
                style: TOAST_STYLE,
              });
            });
          }}
        >
          <Typography
            margin={0}
            startDecorator={<LogoutIcon sx={{ marginRight: 1 }} />}
          >
            Déconnexion
          </Typography>
        </Box>
        <Box component="li" sx={navListStyle} onClick={() => setOpenHelp(true)}>
          <Typography
            margin={0}
            startDecorator={<MoodIcon sx={{ marginRight: 1 }} />}
          >
            Donnez votre avis
          </Typography>
        </Box>
      </ul>

      <Modal open={openHelp} onClose={() => setOpenHelp(false)}>
        <ModalDialog size="lg" aria-labelledby="help-modal">
          <ModalClose />
          <ModalLayout title="Donnez votre avis">
            <HelpUs setOpenHelp={setOpenHelp} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Menu;
