/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";
import Chip from "@mui/joy/Chip";
import { leaseMessage } from "../../utils/fetchLease";
import SuccessAnimation from "../success-animation";
import { useAuth } from "../../context/auth.context";
import { ILease, ILeaseMessage } from "../../interfaces/lease";
import { IAuthor } from "../../interfaces/IAuthor";

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
  const [message, setMessage] = useState<string>("");

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: ILeaseMessage) => leaseMessage(payload)
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
          <Typography level="h5" marginBottom={1}>
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

      <FormControl>
        <FormLabel>Expéditeur</FormLabel>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Chip
            color="neutral"
            variant="soft"
            sx={{ fontWeight: 300, width: "min-content" }}
          >
            {user?.firstName}
          </Chip>
          <Chip
            color="neutral"
            variant="soft"
            sx={{ fontWeight: 300, width: "min-content" }}
          >
            {user?.email}
          </Chip>
        </Box>
      </FormControl>

      <FormControl>
        <FormLabel>Message à envoyer</FormLabel>
        <Textarea
          variant="soft"
          minRows={6}
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>

      {!isLoading && (
        <Button fullWidth type="submit">
          Contacter {lease.user.firstName}
        </Button>
      )}
      {isLoading && (
        <Button
          fullWidth
          disabled
          startDecorator={<CircularProgress color="danger" thickness={3} />}
        />
      )}
    </form>
  );
};

export default LeaseMessage;
