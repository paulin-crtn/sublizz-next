/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Box, Button, CardCover, Chip } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import Card from "@mui/joy/Card";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import { LeaseChips } from "../../components/LeaseChips";
import { ILeaseDetail, ILeaseImage } from "../../interfaces/lease";
import styles from "../../styles/Lease.module.css";
import Avatar from "@mui/joy/Avatar";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Lease: NextPage = ({
  lease,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <Button startDecorator={<EmailIcon />}>
              Contacter {lease.user.firstName}
            </Button>
            <Button startDecorator={<FlagIcon />} variant="outlined">
              Signaler l'annonce
            </Button>
          </div>
        </div>
      </main>
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
