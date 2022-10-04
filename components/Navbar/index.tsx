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
import Link from "next/link";

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
        <Link href="/">Shortloc.com</Link>
        <ul>
          <li onClick={() => setOpenSignin(true)}>Connexion</li>
          <li onClick={() => setOpenSignup(true)}>Inscription</li>
          <li>
            <Link href="/user/leases/edit">
              <Button size="sm">Publier une annonce</Button>
            </Link>
          </li>
        </ul>
      </nav>

      {/** Signin */}
      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signin">
          <ModalClose />
          <Signin />
        </ModalDialog>
      </Modal>

      {/** Signup */}
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-signup">
          <ModalClose />
          <Signup />
        </ModalDialog>
      </Modal>
    </>
  );
};
