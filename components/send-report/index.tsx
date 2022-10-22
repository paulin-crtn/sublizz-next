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
import { storeLeaseReport } from "../../utils/fetch/fetchLease";
import SuccessAnimation from "../success-animation";
import { ISendReport } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const SendReport = ({
  leaseId,
  setOpenReport,
}: {
  leaseId: number;
  setOpenReport: Dispatch<SetStateAction<boolean>>;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [reason, setReason] = useState<string>("");

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: ISendReport) => storeLeaseReport(payload)
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ leaseId, reason });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isSuccess) {
    return (
      <>
        <SuccessAnimation />
        <Box textAlign="center" marginBottom={4}>
          <Typography level="h5" marginBottom={2}>
            Merci pour votre signalement
          </Typography>
          <Typography>Notre équipe va rapidement étudier l'annonce.</Typography>
        </Box>
        <Button variant="solid" fullWidth onClick={() => setOpenReport(false)}>
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
        <FormLabel>Motif</FormLabel>
        <Textarea
          variant="soft"
          minRows={4}
          maxRows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </FormControl>
      {!isLoading && (
        <Button fullWidth type="submit">
          Signaler l'annonce
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

export default SendReport;
