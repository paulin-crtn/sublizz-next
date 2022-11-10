/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import Signin from "../signin";
import Signup from "../signup";
import SignAlert from "../sign-alert";
import ModalLayout from "../modal-layout";
import PasswordReset from "../password-reset";
import InputCitySearch from "../input-city-search";
/* ----------------------------------- MUI ---------------------------------- */
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/joy/Menu";
import ListDivider from "@mui/joy/ListDivider";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
/* ---------------------------------- ICONS --------------------------------- */
import Add from "@mui/icons-material/Add";
import StyleIcon from "@mui/icons-material/Style";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../enum/UserRoleEnum";
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { TOAST_STYLE } from "../../const/toastStyle";
/* --------------------------------- STYLES --------------------------------- */
import styles from "./navbar.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Navbar: FunctionComponent = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user, logout } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openSignAlert, setOpenSignAlert] = useState<boolean>(false);
  const [openPasswordReset, setOpenPasswordReset] = useState<boolean>(false);
  const [signCallback, setSignCallback] = useState<() => any>();
  const [anchorEl, setAnchorEl] = useState(null);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const switchSignModal = () => {
    setOpenSignup((openSignup) => !openSignup);
    setOpenSignin((openSignin) => !openSignin);
  };

  const switchToPasswordReset = () => {
    setOpenSignin(false);
    setOpenPasswordReset(true);
  };

  // MenuList
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <nav className={styles.container}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link href="/">
          <div className={styles.logo}>
            la<span className={styles.textGradient1}>carte</span>des
            <span className={styles.textGradient2}>logements</span>
          </div>
        </Link>
        {(!user || user.role === UserRoleEnum.OWNER) && (
          <Button
            className={styles.cta}
            startDecorator={<Add />}
            color="primary"
            onClick={() => {
              if (user) {
                router.push("/dashboard/leases/new");
              } else {
                setSignCallback(
                  () => () => router.push("/dashboard/leases/new")
                );
                setOpenSignAlert(true);
              }
            }}
            sx={{ marginLeft: 3 }}
          >
            Publier une annonce
          </Button>
        )}
      </Box>
      <Box sx={{ flex: "0 1" }}>
        <InputCitySearch />
      </Box>
      {!user && (
        <Box component="ul" className={styles.unorderList}>
          <li onClick={() => setOpenSignin(true)}>Se connecter</li>
          <li onClick={() => setOpenSignup(true)}>Créer un compte</li>
        </Box>
      )}
      {user && (
        <>
          <Button
            id="menu-button"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="plain"
            color="neutral"
            onClick={handleClick}
            startDecorator={
              <Avatar
                src={
                  user?.profilePictureName
                    ? PROFILE_PICTURE_PATH + "/" + user?.profilePictureName
                    : undefined
                }
                sx={{ marginRight: 0.5 }}
                size="md"
              />
            }
            sx={{ paddingY: 0, fontSize: "1rem", fontWeight: 400 }}
          >
            {user.firstName}
          </Button>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            size="md"
            aria-labelledby="menu-button"
            placement="bottom-end"
          >
            {user.role === UserRoleEnum.OWNER && (
              <Link href="/dashboard/leases">
                <MenuItem onClick={handleClose}>
                  <ListItemDecorator>
                    <StyleIcon />
                  </ListItemDecorator>
                  Mes Annonces
                </MenuItem>
              </Link>
            )}
            {user.role === UserRoleEnum.SEEKER && (
              <Link href="/dashboard/favorites">
                <MenuItem onClick={handleClose}>
                  <ListItemDecorator>
                    <FavoriteIcon />
                  </ListItemDecorator>
                  Favoris
                </MenuItem>
              </Link>
            )}
            <Link href="/dashboard/messages">
              <MenuItem onClick={handleClose}>
                <ListItemDecorator>
                  <EmailIcon />
                </ListItemDecorator>
                Message
              </MenuItem>
            </Link>
            <Link href="/dashboard/profile">
              <MenuItem onClick={handleClose}>
                <ListItemDecorator>
                  <PersonIcon />
                </ListItemDecorator>
                Profil
              </MenuItem>
            </Link>
            <Link href="/dashboard/account">
              <MenuItem onClick={handleClose}>
                <ListItemDecorator>
                  <SettingsIcon />
                </ListItemDecorator>
                Compte
              </MenuItem>
            </Link>
            <ListDivider />
            <MenuItem
              onClick={() => {
                handleClose();
                router.asPath.split("/")[1] === "dashboard"
                  ? logout(() => router.push("/"))
                  : logout();
                toast.success(`À bientôt ${user?.firstName}`, {
                  style: TOAST_STYLE,
                });
              }}
            >
              <ListItemDecorator>
                <LogoutIcon />
              </ListItemDecorator>
              Déconnexion
            </MenuItem>
          </Menu>
        </>
      )}

      {/** Signin */}
      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signin">
          <ModalClose />
          <ModalLayout title="Se connecter">
            <Signin
              setOpenSignin={setOpenSignin}
              switchSignModal={switchSignModal}
              switchToPasswordReset={switchToPasswordReset}
              signCallback={signCallback}
              setSignCallback={setSignCallback}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Signup */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signup">
          <ModalClose />
          <ModalLayout title="Créer un compte">
            <Signup
              setOpenSignup={setOpenSignup}
              switchSignModal={switchSignModal}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>

      {/** Sign Alert */}
      <Modal open={openSignAlert} onClose={() => setOpenSignAlert(false)}>
        <ModalDialog
          aria-labelledby="close-modal-sign-alert"
          sx={{ maxWidth: "700px", padding: 0, border: "none" }}
        >
          <ModalClose />
          <SignAlert
            setOpenSignAlert={setOpenSignAlert}
            setOpenSignin={setOpenSignin}
            setOpenSignup={setOpenSignup}
          />
        </ModalDialog>
      </Modal>

      {/** Password Reset */}
      <Modal
        open={openPasswordReset}
        onClose={() => setOpenPasswordReset(false)}
      >
        <ModalDialog size="lg" aria-labelledby="close-modal-password-reset">
          <ModalClose />
          <ModalLayout title="Réinitialiser le mot de passe">
            <PasswordReset setOpenPasswordReset={setOpenPasswordReset} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </nav>
  );
};

export default Navbar;
