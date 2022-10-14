/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";
import { leaseReport } from "../../utils/fetchLease";
import handleServerError from "../../utils/setServerError";
import SuccessAnimation from "../success-animation";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseReport = ({
  leaseId,
  setOpenReport,
}: {
  leaseId: number;
  setOpenReport: Dispatch<SetStateAction<boolean>>;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [reason, setReason] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await leaseReport({
        leaseId,
        reason,
      });
      data.statusCode && data.statusCode != 200
        ? handleServerError(data.message, setServerErrors)
        : setIsSuccess(true);
    } catch (error) {
      handleServerError(error, setServerErrors);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isSuccess) {
    return (
      <>
        <SuccessAnimation />
        <Box textAlign="center" marginBottom={4}>
          <Typography level="h5" marginBottom={1}>
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
    <form onSubmit={handleSubmit}>
      {!!serverErrors.length &&
        serverErrors.map((error: string, index: number) => (
          <Alert
            key={index}
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        ))}

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

export default LeaseReport;
