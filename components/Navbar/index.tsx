/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useState } from "react";
import Link from "next/link";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Add from "@mui/icons-material/Add";
import Signin from "../signin";
import Signup from "../signup";
import ModalLayout from "../modal-layout";
import styles from "./navbar.module.css";
import { useAuth } from "../../context/auth.context";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Navbar: FunctionComponent = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

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
        {!user && (
          <>
            <li onClick={() => setOpenSignin(true)}>Se connecter</li>
            <li onClick={() => setOpenSignup(true)}>Créer un compte</li>
          </>
        )}
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
          <ModalLayout title="Se connecter">
            <Signin
              setOpenSignin={setOpenSignin}
              switchSignModal={switchSignModal}
              switchToPasswordReset={switchToPasswordReset}
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
    </nav>
  );
};

export default Navbar;
