/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/future/image";
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
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../enum/UserRoleEnum";
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { TOAST_STYLE } from "../../const/toastStyle";
import logoImg from "../../public/img/logo.png";
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
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [guestAnchorEl, setGuestAnchorEl] = useState(null);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const switchSignModal = () => {
    setOpenSignup((openSignup) => !openSignup);
    setOpenSignin((openSignin) => !openSignin);
  };

  const switchToPasswordReset = () => {
    setOpenSignin(false);
    setOpenPasswordReset(true);
  };

  // User Menu
  const openUser = Boolean(userAnchorEl);
  const handleUserClick = (event: any) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  // Guest Menu
  const openGuest = Boolean(guestAnchorEl);
  const handleGuestClick = (event: any) => {
    setGuestAnchorEl(event.currentTarget);
  };
  const handleGuestClose = () => {
    setGuestAnchorEl(null);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <nav className={styles.container}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ "@media (max-width: 760px)": { display: "none" } }}>
          <Link href="/">
            <Box
              sx={{
                fontSize: "1.6rem",
                fontWeight: 600,
                letterSpacing: 0,
                cursor: "pointer",
              }}
            >
              la
              <Box component="span" sx={{ color: "#4700cc" }}>
                carte
              </Box>
              des
              <Box component="span" sx={{ color: "#4700cc" }}>
                logements
              </Box>
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            "@media (min-width: 761px)": { display: "none" },
          }}
        >
          <Link href="/">
            <Box sx={{ position: "relative", width: "40px", height: "40px" }}>
              <Image
                src={logoImg}
                alt="logo lacartedeslogements"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Link>
        </Box>
        {!user && (
          <Button
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
            sx={(theme) => ({
              boxShadow: theme.vars.shadow.lg,
              marginX: 3,
              whiteSpace: "nowrap",
              "@media (max-width: 1200px)": { display: "none" },
            })}
          >
            Publier une annonce
          </Button>
        )}
      </Box>

      {/** SEARCH */}
      <Box
        sx={{
          flex: "0 1 100%",
          marginX: "30px",
        }}
      >
        <InputCitySearch />
      </Box>

      {/** MENU */}
      {/** Desktop */}
      {!user && (
        <Box
          component="ul"
          sx={{
            display: "flex",
            "@media (max-width: 1200px)": { display: "none" },
          }}
        >
          <Box
            component="li"
            onClick={() => setOpenSignin(true)}
            sx={{
              marginLeft: "30px",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Se connecter
          </Box>
          <Box
            component="li"
            onClick={() => setOpenSignup(true)}
            sx={{
              marginLeft: "25px",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Créer un compte
          </Box>
        </Box>
      )}

      {/** Mobile */}
      {!user && (
        <Box
          sx={{
            "@media (min-width: 1201px)": { display: "none" },
          }}
        >
          <Button
            id="guest-menu-button"
            aria-controls={openGuest ? "guest-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openGuest ? "true" : undefined}
            variant="outlined"
            color="neutral"
            onClick={handleGuestClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="guest-menu"
            anchorEl={guestAnchorEl}
            open={openGuest}
            onClose={handleGuestClose}
            aria-labelledby="guest-menu-button"
            placement="bottom-end"
          >
            <MenuItem
              onClick={() => {
                handleGuestClose();
                setOpenSignin(true);
              }}
            >
              Connexion
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleGuestClose();
                setOpenSignup(true);
              }}
            >
              Inscription
            </MenuItem>
            <ListDivider />
            <MenuItem
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
            >
              Publier une annonce
            </MenuItem>
          </Menu>
        </Box>
      )}

      {user && (
        <Box>
          <Button
            id="user-menu-button"
            aria-controls={openUser ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? "true" : undefined}
            variant="plain"
            color="neutral"
            onClick={handleUserClick}
            // onClick={() => {
            //   router.push("/dashboard");
            // }}
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
            sx={{
              paddingY: 0,
              fontSize: "1rem",
              fontWeight: 400,
              "&:hover": { backgroundColor: "#ffffff" },
              "&:active": { backgroundColor: "#ffffff" },
            }}
          >
            {user.firstName}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={userAnchorEl}
            open={openUser}
            onClose={handleUserClose}
            size="md"
            aria-labelledby="user-menu-button"
            placement="bottom-end"
          >
            {user.role === UserRoleEnum.SEEKER && (
              <Link href="/dashboard/favorites">
                <MenuItem onClick={handleUserClose}>
                  {/* <ListItemDecorator>
                    <FavoriteIcon />
                  </ListItemDecorator> */}
                  Favoris
                </MenuItem>
              </Link>
            )}
            <Link href="/dashboard/messages">
              <MenuItem onClick={handleUserClose}>
                {/* <ListItemDecorator>
                  <EmailIcon />
                </ListItemDecorator> */}
                Message
              </MenuItem>
            </Link>
            <ListDivider />
            {user.role === UserRoleEnum.OWNER && (
              <>
                <Link href="/dashboard/leases">
                  <MenuItem onClick={handleUserClose}>
                    {/* <ListItemDecorator>
                    <StyleIcon />
                  </ListItemDecorator> */}
                    Gérer mes annonces
                  </MenuItem>
                </Link>
                <Link href="/dashboard/leases/new">
                  <MenuItem onClick={handleUserClose}>
                    Publier une annonce
                  </MenuItem>
                </Link>
                <ListDivider />
              </>
            )}
            <Link href="/dashboard/profile">
              <MenuItem onClick={handleUserClose}>
                {/* <ListItemDecorator>
                  <PersonIcon />
                </ListItemDecorator> */}
                Profil
              </MenuItem>
            </Link>
            <Link href="/dashboard/account">
              <MenuItem onClick={handleUserClose}>
                {/* <ListItemDecorator>
                  <PersonIcon />
                </ListItemDecorator> */}
                Compte
              </MenuItem>
            </Link>
            <ListDivider />
            <MenuItem
              onClick={() => {
                handleUserClose();
                router.asPath.split("/")[1] === "dashboard"
                  ? logout(() => router.push("/"))
                  : logout();
                toast.success(`À bientôt ${user?.firstName}`, {
                  style: TOAST_STYLE,
                });
              }}
            >
              {/* <ListItemDecorator>
                <LogoutIcon />
              </ListItemDecorator> */}
              Déconnexion
            </MenuItem>
          </Menu>
        </Box>
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
          sx={{ maxWidth: "650px", padding: 0, border: "none" }}
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
