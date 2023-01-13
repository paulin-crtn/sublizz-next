"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
import { useUnreadConversationsId } from "../../../utils/react-query/unread-conversations";
/* ------------------------------- COMPONENTS ------------------------------- */
import Signin from "../signin";
import Signup from "../signup";
import SignAlert from "../sign-alert";
import ModalLayout from "../modal-layout";
import ResetPasswordAsk from "../reset-password-ask";
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
import Typography from "@mui/joy/Typography";
import Badge from "@mui/joy/Badge";
import IconButton from "@mui/joy/IconButton";
/* ---------------------------------- ICONS --------------------------------- */
import Add from "@mui/icons-material/Add";
import StyleIcon from "@mui/icons-material/Style";
import EmailIcon from "@mui/icons-material/Email";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../../enum/UserRoleEnum";
import { PROFILE_PICTURE_PATH } from "../../../const/objectStoragePath";
import { TOAST_STYLE } from "../../../const/toastStyle";
import { poppins } from "../../../utils/nextFont";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Navbar: FunctionComponent = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user, logout } = useAuth();
  const { data: unreadConversationsId } = useUnreadConversationsId(user);

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const pathname = usePathname();

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

  const handleLogout = () => {
    const path = pathname?.split("/")[1];
    path === "dashboard" || path === "messages"
      ? logout(() => router.push("/"))
      : logout();
    toast.success(`À bientôt ${user?.firstName}`, {
      style: TOAST_STYLE,
    });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        padding: "25px 35px",
        // background: "rgba(12, 12, 12, 0.9)",
        backgroundColor: theme.colorSchemes.dark.palette.background.body,
        backdropFilter: "blur(5px)",
        zIndex: 1000,
      })}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ "@media (max-width: 760px)": { display: "none" } }}>
          <Link href="/">
            <Typography
              component="p"
              letterSpacing={0}
              sx={{
                fontSize: "1.6rem",
                fontWeight: 600,
                letterSpacing: 0,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              lacartedeslogements
            </Typography>
          </Link>
        </Box>
        <Link href="/">
          <IconButton
            aria-label="lacartedeslogements homepage button"
            color="neutral"
            variant="outlined"
            sx={{ "@media (min-width: 761px)": { display: "none" } }}
          >
            <LocationOnIcon />
          </IconButton>
        </Link>
        {!user && (
          <Button
            className="btn-primary-gradient"
            startDecorator={<Add />}
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
            sx={{
              marginLeft: 3,
              whiteSpace: "nowrap",
              "@media (max-width: 1150px)": { display: "none" },
            }}
          >
            Publier une annonce
          </Button>
        )}
      </Box>

      {/** SEARCH */}
      <Box
        sx={{
          flex: "0 1 500px",
          marginX: "50px",
          "@media (max-width: 850px)": { marginX: "20px" },
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
            "@media (max-width: 1150px)": { display: "none" },
          }}
        >
          <Box
            component="li"
            onClick={() => setOpenSignin(true)}
            sx={{
              fontFamily: poppins.style.fontFamily, // Safari
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              color: "#ffffff",
            }}
          >
            Se connecter
          </Box>
          <Box
            component="li"
            onClick={() => setOpenSignup(true)}
            sx={{
              marginLeft: "25px",
              fontFamily: poppins.style.fontFamily, // Safari
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              color: "#ffffff",
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
            "@media (min-width: 1151px)": { display: "none" },
          }}
        >
          <IconButton
            id="guest-menu-button"
            aria-controls={openGuest ? "guest-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openGuest ? "true" : undefined}
            color="neutral"
            variant="outlined"
            onClick={handleGuestClick}
          >
            <MenuIcon />
          </IconButton>
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
              Se connecter
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleGuestClose();
                setOpenSignup(true);
              }}
            >
              Créer un compte
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
        <Box display="flex" alignItems="center" gap={1.5}>
          <Link href="/messages">
            <IconButton color="neutral">
              {!!unreadConversationsId.length && (
                <Badge
                  color="danger"
                  size="sm"
                  badgeInset="-10%"
                  badgeContent={unreadConversationsId.length}
                >
                  <EmailIcon />
                </Badge>
              )}
              {!unreadConversationsId.length && <MailIcon />}
            </IconButton>
          </Link>

          <IconButton
            id="user-menu-button"
            aria-controls={openUser ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? "true" : undefined}
            variant="plain"
            color="neutral"
            onClick={handleUserClick}
          >
            {!!user.profilePictureName && (
              <Avatar
                src={PROFILE_PICTURE_PATH + "/" + user?.profilePictureName}
              />
            )}
            {!user.profilePictureName && (
              <Avatar>{user?.firstName.at(0)?.toUpperCase()}</Avatar>
            )}
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={userAnchorEl}
            open={openUser}
            onClose={handleUserClose}
            size="md"
            aria-labelledby="user-menu-button"
            placement="bottom-end"
            sx={{ "& li": { outline: "none" } }} // Safari
          >
            {user.role === UserRoleEnum.SEEKER && (
              <Link href="/dashboard/favorites">
                <MenuItem onClick={handleUserClose}>
                  <ListItemDecorator>
                    <FavoriteIcon />
                  </ListItemDecorator>
                  Favoris
                </MenuItem>
              </Link>
            )}

            {user.role === UserRoleEnum.OWNER && (
              <>
                <Link href="/dashboard/leases">
                  <MenuItem onClick={handleUserClose}>
                    <ListItemDecorator>
                      <StyleIcon />
                    </ListItemDecorator>
                    Gérer mes annonces
                  </MenuItem>
                </Link>
                <Link href="/dashboard/leases/new">
                  <MenuItem onClick={handleUserClose}>
                    <ListItemDecorator>
                      <AddIcon />
                    </ListItemDecorator>
                    Publier une annonce
                  </MenuItem>
                </Link>
              </>
            )}

            <ListDivider />
            <Link href="/dashboard/profile">
              <MenuItem onClick={handleUserClose}>
                <ListItemDecorator>
                  <AccountCircleIcon />
                </ListItemDecorator>
                Profil
              </MenuItem>
            </Link>
            <Link href="/dashboard/account">
              <MenuItem onClick={handleUserClose}>
                <ListItemDecorator>
                  <SettingsIcon />
                </ListItemDecorator>
                Compte
              </MenuItem>
            </Link>
            <ListDivider />
            <MenuItem
              onClick={() => {
                handleUserClose();
                handleLogout();
              }}
            >
              <ListItemDecorator>
                <LogoutIcon />
              </ListItemDecorator>
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
        <ModalDialog size="lg" aria-labelledby="close-modal-sign-alert">
          <ModalClose />
          <ModalLayout title="Vous devez vous identifier">
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
            <ResetPasswordAsk setOpenPasswordReset={setOpenPasswordReset} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Navbar;
