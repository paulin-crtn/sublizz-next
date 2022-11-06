/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { getUserLeases } from "../../utils/fetch/fetchLease";
import { deleteUser } from "../../utils/fetch/fetchUser";
import { destroyLeaseImages } from "../../utils/fetch/fetchLeaseImages";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
/* ------------------------------- INTERFACES ------------------------------- */
import { IUser } from "../../interfaces/IUser";
import { ILeaseDetail } from "../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DeleteAccount = ({
  setOpenDeleteAccount,
  user,
}: {
  setOpenDeleteAccount: Dispatch<SetStateAction<boolean>>;
  user: IUser;
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { logout } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isDeletingFile, setIsDeletingFile] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const handleDelete = async () => {
    setIsDeletingFile(true);
    setError(undefined);
    try {
      // Data
      const userLeases: ILeaseDetail[] = await getUserLeases();
      const leaseImages: string[] = userLeases.reduce(
        (acc: string[], lease: ILeaseDetail) =>
          lease.leaseImages && !!lease.leaseImages.length
            ? [...acc, ...lease.leaseImages]
            : acc,
        []
      );
      // Delete user from DB
      await deleteUser(user.id);
      // Delete leaseImages from storage
      if (!!leaseImages.length) {
        await destroyLeaseImages(leaseImages);
      }
      // Toast
      toast.success("Compte supprimé", { style: TOAST_STYLE });
      // Logout user
      logout(() => router.push("/"));
    } catch (err) {
      err instanceof Error
        ? setError(err.message)
        : setError("Une erreur est survenue");
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box>
      {error && (
        <Alert
          startDecorator={<ErrorIcon />}
          variant="soft"
          color="danger"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Typography textAlign="center" fontWeight={500}>
        Vous êtes sur le point de supprimer votre compte.
      </Typography>
      <List
        aria-labelledby="list-why-create-an-account"
        sx={{
          width: "max-content",
          marginX: "auto",
          marginTop: 2,
          marginBottom: 3,
          fontWeight: 300,
          "--List-decorator-size": "32px",
        }}
      >
        <ListItem
          sx={{ minBlockSize: 0, paddingBlockStart: 0, paddingBlockEnd: 0 }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>⚠️</ListItemDecorator>
          Vos informations personnelles seront supprimées
        </ListItem>
        <ListItem
          sx={{ minBlockSize: 0, paddingBlockStart: 0, paddingBlockEnd: 0 }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>⚠️</ListItemDecorator>
          Vos annonces seront supprimées
        </ListItem>
        <ListItem
          sx={{ minBlockSize: 0, paddingBlockStart: 0, paddingBlockEnd: 0 }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>⚠️</ListItemDecorator>
          Vos messages et vos favoris seront supprimés
        </ListItem>
      </List>
      {!isDeletingFile && (
        <Button color="danger" variant="soft" fullWidth onClick={handleDelete}>
          Supprimer mon compte
        </Button>
      )}
      {isDeletingFile && (
        <Button color="danger" variant="soft" fullWidth disabled>
          <CircularProgress color="danger" thickness={3} />
        </Button>
      )}
      <Button
        color="neutral"
        variant="soft"
        fullWidth
        onClick={() => setOpenDeleteAccount(false)}
        sx={{ mt: 1 }}
      >
        Annuler
      </Button>
    </Box>
  );
};

export default DeleteAccount;
