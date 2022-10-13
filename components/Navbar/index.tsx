/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";
import Add from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/auth.context";
import Signin from "../signin";
import Signup from "../signup";
import SignAlert from "../sign-alert";
import ModalLayout from "../modal-layout";
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
  const [signCallback, setSignCallback] = useState<() => any>();
  const [anchorEl, setAnchorEl] = useState(null);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const switchSignModal = () => {
    setOpenSignup((openSignup) => !openSignup);
    setOpenSignin((openSignin) => !openSignin);
  };

  const switchToPasswordReset = () => {
    setOpenSignin(false);
  };

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
      <Link href="/">
        <div className={styles.logo}>ShortLoc</div>
      </Link>
      <ul>
        {!user && (
          <>
            <li onClick={() => setOpenSignin(true)}>Se connecter</li>
            <li onClick={() => setOpenSignup(true)}>Créer un compte</li>
            <li
              className={styles.cta}
              onClick={() => {
                setSignCallback(
                  () => () => router.replace("/user/leases/edit")
                );
                setOpenSignAlert(true);
              }}
            >
              <Button startDecorator={<Add />}>Publier une annonce</Button>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Button
                id="basic-demo-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="plain"
                color="neutral"
                onClick={handleClick}
                startDecorator={<AppsIcon />}
                sx={{ fontSize: "1rem" }}
              >
                Mon espace
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                size="lg"
                aria-labelledby="basic-demo-button"
              >
                <Link href="/user/leases">
                  <MenuItem onClick={handleClose}>
                    <Typography startDecorator={<NotesIcon />}>
                      Annonces
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href="/user/profile">
                  <MenuItem onClick={handleClose}>
                    <Typography startDecorator={<PersonIcon />}>
                      Profil
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href="/user/account">
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
                    router.asPath.split("/")[1] === "user"
                      ? logout(() => router.push("/"))
                      : logout();
                  }}
                >
                  <Typography color="danger" startDecorator={<LogoutIcon />}>
                    Déconnexion
                  </Typography>
                </MenuItem>
              </Menu>
            </li>
            <li className={styles.cta}>
              <Link href="/user/leases/edit">
                <Button startDecorator={<Add />}>Publier une annonce</Button>
              </Link>
            </li>
          </>
        )}
      </ul>

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
            <Signup switchSignModal={switchSignModal} />
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
    </nav>
  );
};

export default Navbar;
