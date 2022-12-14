/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
/* ---------------------------------- UTILS --------------------------------- */
import { storeLeaseReport } from "../../../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import SuccessAnimation from "../../../../shared/success-animation";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseReportForm } from "../../../../../interfaces/lease";

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
  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<ILeaseReportForm>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: ILeaseReportForm) => storeLeaseReport({ ...payload, leaseId })
  );

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<ILeaseReportForm> = async (payload) => {
    mutate(payload);
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
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <FormControl error={!!errors.reason}>
        <Textarea
          variant="soft"
          minRows={5}
          maxRows={5}
          placeholder="Indiquez la raison du signalement"
          {...register("reason", {
            required: "Ce champs est requis",
            maxLength: {
              value: 2000,
              message: "2000 caractères maximum",
            },
          })}
        />
        {errors.reason && (
          <FormHelperText>{errors.reason.message}</FormHelperText>
        )}
      </FormControl>

      <Button loading={isLoading} fullWidth type="submit">
        Signaler l'annonce
      </Button>
    </form>
  );
};

export default LeaseReport;
