/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import styles from "./Navbar.module.css";
import { Signin } from "../Signin";
import { Signup } from "../Signup";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Navbar: React.FC = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openSignin, setOpenSignin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <nav className={styles.container}>
        <p>Shortloc.com</p>
        <ul>
          <li>
            <Button
              size="sm"
              variant="plain"
              onClick={() => setOpenSignin(true)}
            >
              Connexion
            </Button>
          </li>
          <li>
            <Button
              size="sm"
              variant="plain"
              onClick={() => setOpenSignup(true)}
            >
              Inscription
            </Button>
          </li>
          <li>
            <Button size="sm">Publier une annonce</Button>
          </li>
        </ul>
      </nav>

      {/** Signin */}
      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <ModalDialog aria-labelledby="close-modal-signin">
          <ModalClose />
          <Signin />
        </ModalDialog>
      </Modal>

      {/** Signup */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <ModalDialog aria-labelledby="close-modal-signup">
          <ModalClose />
          <Signup />
        </ModalDialog>
      </Modal>
    </>
  );
};
