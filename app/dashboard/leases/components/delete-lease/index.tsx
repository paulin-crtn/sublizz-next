/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import { deleteLease } from "../../../../../utils/fetch/fetchLease";
import { destroyLeaseImages } from "../../../../../utils/fetch/fetchLeaseImages";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseDates from "../../../../shared/lease-dates";
import LeaseChips from "../../../../shared/lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../../../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DeleteLease: FunctionComponent<{
  lease: ILeaseDetail;
  setOpenConfirmDelete: Dispatch<SetStateAction<boolean>>;
}> = ({ lease, setOpenConfirmDelete }) => {
  /* ------------------------------ USE MUTATION ------------------------------ */
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteLease, isLoading } = useMutation(
    () => deleteLease(lease.id),
    {
      onSuccess: async () => {
        // Update React Query Cache
        queryClient.setQueryData(
          ["userLeases"],
          (previousLeases: ILeaseDetail[] | undefined) =>
            previousLeases?.filter(
              (previousLease) => previousLease.id !== lease.id
            )
        );
        // Toast
        toast.success("Annonce supprimée", { style: TOAST_STYLE });
        // Delete leaseImages from storage
        if (lease.leaseImages && !!lease.leaseImages.length) {
          await destroyLeaseImages(lease.leaseImages);
        }
      },
      onError: async (error) => {
        error instanceof Error
          ? toast.error(error.message, { style: TOAST_STYLE })
          : toast.error("Une erreur est survenue", {
              style: TOAST_STYLE,
            });
      },
    }
  );

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Typography mb={3} textAlign="center">
        Cette annonce et les messages associés seront définitivement supprimés.
      </Typography>
      <Box
        sx={{
          marginBottom: 3,
          padding: 2,
          border: "1px solid #dddee0",
          borderRadius: "12px",
        }}
      >
        <Typography level="h5" fontWeight="600">
          {lease.city}
        </Typography>
        <LeaseDates lease={lease} />
        <LeaseChips lease={lease} size="sm" />
        <Typography level="h6" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
      </Box>
      {!isLoading && (
        <Button color="danger" fullWidth onClick={() => mutateDeleteLease()}>
          Supprimer l'annonce
        </Button>
      )}
      {isLoading && (
        <Button variant="soft" color="danger" fullWidth disabled>
          <CircularProgress color="danger" />
        </Button>
      )}
      <Button
        variant="soft"
        color="neutral"
        fullWidth
        onClick={() => setOpenConfirmDelete(false)}
        sx={{ mt: 1 }}
      >
        Annuler
      </Button>
    </>
  );
};

export default DeleteLease;
