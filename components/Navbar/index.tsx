/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Link from "next/link";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Add from "@mui/icons-material/Add";
import { Signin } from "../Signin";
import { Signup } from "../Signup";
import styles from "./Navbar.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Navbar: React.FC = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  function switchSignModal() {
    setOpenSignup((openSignup) => !openSignup);
    setOpenSignin((openSignin) => !openSignin);
  }

  function switchToPasswordReset() {
    setOpenSignin(false);
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <nav className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>ShortLoc</div>
      </Link>
      <ul>
        <li onClick={() => setOpenSignin(true)}>Se connecter</li>
        <li onClick={() => setOpenSignup(true)}>Créer un compte</li>
        <li className={styles.cta}>
          <Link href="/user/leases/edit">
            <Button startDecorator={<Add />}>Publier une annonce</Button>
          </Link>
        </li>
      </ul>

      {/** Signin */}
      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signin">
          <ModalClose />
          <Signin
            switchSignModal={switchSignModal}
            switchToPasswordReset={switchToPasswordReset}
          />
        </ModalDialog>
      </Modal>

      {/** Signup */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signup">
          <ModalClose />
          <Signup switchSignModal={switchSignModal} />
        </ModalDialog>
      </Modal>
    </nav>
  );
};
