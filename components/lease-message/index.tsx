/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import Image from "next/future/image";
import { useMutation } from "@tanstack/react-query";
/* ---------------------------------- UTILS --------------------------------- */
import { storeLeaseMessage } from "../../utils/fetch/fetchLease";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseChips from "../lease-chips";
import LeaseDates from "../lease-dates";
import SuccessAnimation from "../success-animation";
/* ----------------------------------- MUI ---------------------------------- */
import CardCover from "@mui/joy/CardCover";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";
import FormLabel from "@mui/joy/FormLabel";
import { Divider } from "@mui/joy";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease, ILeaseMessageForm } from "../../interfaces/lease";
import { IAuthor } from "../../interfaces/IAuthor";
/* -------------------------------- CONSTANTS ------------------------------- */
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";
import noLeaseImg from "../../public/img/no-lease-img.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseMessage = ({
  lease,
  setOpenMessage,
}: {
  lease: ILease & { user: IAuthor };
  setOpenMessage: Dispatch<SetStateAction<boolean>>;
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  /* ------------------------------- REACT STATE ------------------------------ */
  const [message, setMessage] = useState<string>(user?.standardMessage || "");

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: ILeaseMessageForm) => storeLeaseMessage(payload)
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ leaseId: lease.id, message });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isSuccess) {
    return (
      <>
        <SuccessAnimation />
        <Box textAlign="center" marginBottom={4}>
          <Typography level="h5" marginBottom={2}>
            Message envoyé
          </Typography>
          <Typography>
            Votre message a été envoyé par email à {lease.user.firstName}.
          </Typography>
        </Box>
        <Button variant="solid" fullWidth onClick={() => setOpenMessage(false)}>
          Fermer
        </Button>
      </>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: "flex",
          marginBottom: 3,
        }}
      >
        <Box
          sx={{
            flex: "0 0 140px",
            position: "relative",
            height: "140px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Image
            src={
              lease.leaseImages && lease.leaseImages[0]
                ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                : noLeaseImg
            }
            loading="lazy"
            alt="first lease picture"
            fill={true}
            style={{ objectFit: "cover" }}
          />
          <CardCover
            sx={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "12px 0 0 12px",
            }}
          />
        </Box>
        <Box sx={{ flex: "1 1", paddingLeft: 2 }}>
          <Typography level="h5" fontWeight={600}>
            {lease.city}
          </Typography>
          <LeaseDates lease={lease} />
          <LeaseChips lease={lease} size="sm" />
          <Typography level="h6" fontWeight="300" marginTop={2}>
            {lease.pricePerMonth}€ CC
          </Typography>
        </Box>
      </Box>

      <Divider />

      <FormControl sx={{ marginTop: 3 }}>
        <FormLabel>Présentez-vous auprès de {lease.user.firstName}</FormLabel>
        <Textarea
          variant="soft"
          minRows={6}
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>

      {isError && error instanceof Error && (
        <Alert
          startDecorator={<ErrorIcon />}
          variant="soft"
          color="danger"
          sx={{ mb: 2 }}
        >
          {error.message}
        </Alert>
      )}

      {!isLoading && (
        <Button fullWidth type="submit">
          Envoyer un message
        </Button>
      )}
      {isLoading && (
        <Button
          fullWidth
          disabled
          startDecorator={<CircularProgress thickness={3} />}
        />
      )}
    </form>
  );
};

export default LeaseMessage;
