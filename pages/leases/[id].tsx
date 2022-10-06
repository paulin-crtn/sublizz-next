/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
/* -------------------------------- COMPONENT ------------------------------- */
import { LeaseChips } from "../../components/LeaseChips";
import { ContactAuthor } from "../../components/ContactAuthor";
/* -------------------------------- INTERFACE ------------------------------- */
import { ILeaseDetail, ILeaseImage } from "../../interfaces/lease";
/* -------------------------------- MUI ICONS ------------------------------- */
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
/* --------------------------------- MUI JOY -------------------------------- */
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
/* --------------------------------- STYLES --------------------------------- */
import styles from "../../styles/Lease.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Lease: NextPage = ({
  lease,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Typography component="h1" level="h3">
            {lease.city}
          </Typography>

          <div className={styles.dates}>
            <Typography level="h5" fontWeight={300}>
              Du {lease.startDate} au {lease.endDate}
            </Typography>
            {!!lease.isDateFlexible && (
              <Chip color="neutral" variant="soft" sx={{ fontWeight: 400 }}>
                Dates flexibles
              </Chip>
            )}
          </div>

          <LeaseChips lease={lease} />
        </div>

        <div>
          <Typography level="h4" fontWeight={400}>
            {lease.pricePerMonth}€ CC
          </Typography>
        </div>
      </header>

      <main>
        <Box
          component="ul"
          sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3, mb: 6 }}
        >
          {lease.leaseImages.map((image: ILeaseImage) => (
            <Card
              key={image.id}
              component="li"
              sx={{ flexGrow: 1, height: 250, maxWidth: 400 }}
            >
              <CardCover>
                <Image src={image.url} layout="fill" priority={true} />
              </CardCover>
            </Card>
          ))}
        </Box>

        <div className={styles.wrapper}>
          <div>
            <Typography level="h6" fontWeight={300}>
              {lease.description}
            </Typography>
            <div className={styles.author}>
              <Avatar
                alt="Photo de profil de l'auteur de l'annonce"
                src={lease.user.profilePictureUrl}
                sx={{
                  width: 80,
                  height: 80,
                  mr: 2,
                }}
              />
              <div>
                <Typography fontWeight={300}>
                  Annonce publiée le {lease.createdAt}
                  <br />
                  par{" "}
                  <Typography fontWeight={500}>
                    {lease.user.firstName}
                  </Typography>
                </Typography>
              </div>
            </div>
          </div>
          <div className={styles.cta}>
            <Button
              startDecorator={<EmailIcon />}
              onClick={() => setOpenContact(true)}
            >
              Contacter {lease.user.firstName}
            </Button>
            <Button
              startDecorator={<FlagIcon />}
              onClick={() => setOpenReport(true)}
              variant="outlined"
            >
              Signaler l'annonce
            </Button>
          </div>
        </div>
      </main>

      {/** Contact author */}
      <Modal open={openContact} onClose={() => setOpenContact(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-contact">
          <ModalClose />
          <ContactAuthor author={lease.user} />
        </ModalDialog>
      </Modal>

      {/** Report lease */}
      <Modal open={openReport} onClose={() => setOpenReport(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-report">
          <ModalClose />
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default Lease;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const response = await fetch("http://localhost:4000/leases/" + id);
  const lease: ILeaseDetail = await response.json();
  return {
    props: { lease },
  };
};
