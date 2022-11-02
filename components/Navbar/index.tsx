/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
/* ---------------------------------- ICONS --------------------------------- */
import Add from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
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
        <Button
          className={styles.cta}
          startDecorator={<Add />}
          color="primary"
          onClick={() => {
            setSignCallback(
              () => () => router.replace("/dashboard/leases/new")
            );
            setOpenSignAlert(true);
          }}
          sx={{ marginLeft: 3 }}
        >
          Publier une annonce
        </Button>
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
            id="basic-demo-button"
            aria-controls={open ? "basic-menu" : undefined}
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
                sx={{ height: 30, width: 30, mr: 0.5 }}
              />
            }
            sx={{ paddingY: 0, fontSize: "1rem", fontWeight: 400 }}
          >
            {user.firstName}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            size="lg"
            aria-labelledby="basic-demo-button"
          >
            <Link href="/dashboard/leases">
              <MenuItem onClick={handleClose}>
                <Typography startDecorator={<NotesIcon />}>
                  Mes Annonces
                </Typography>
              </MenuItem>
            </Link>
            <Link href="/dashboard/messages">
              <MenuItem onClick={handleClose}>
                <Typography startDecorator={<EmailIcon />}>Messages</Typography>
              </MenuItem>
            </Link>
            <Link href="/dashboard/profile">
              <MenuItem onClick={handleClose}>
                <Typography startDecorator={<PersonIcon />}>Profil</Typography>
              </MenuItem>
            </Link>
            <Link href="/dashboard/account">
              <MenuItem onClick={handleClose}>
                <Typography startDecorator={<SettingsIcon />}>
                  Compte
                </Typography>
              </MenuItem>
            </Link>
            <ListDivider />
            <MenuItem
              onClick={() => {
                handleClose();
                router.asPath.split("/")[1] === "dashboard"
                  ? logout(() => router.push("/"))
                  : logout();
              }}
            >
              <Typography color="danger" startDecorator={<LogoutIcon />}>
                Déconnexion
              </Typography>
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
        <ModalDialog size="lg" aria-labelledby="close-modal-sign-alert">
          <ModalClose />
          <ModalLayout title="Identifiez-vous pour continuer">
            <SignAlert
              setOpenSignAlert={setOpenSignAlert}
              setOpenSignin={setOpenSignin}
              setOpenSignup={setOpenSignup}
            />
          </ModalLayout>
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
