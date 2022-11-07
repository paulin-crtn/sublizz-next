/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import { updateUser } from "../../utils/fetch/fetchUser";
import parseUserForm from "../../utils/parseUserForm";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import ModalLayout from "../modal-layout";
import DeleteAccount from "../delete-account";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/joy/CircularProgress";
import FormHelperText from "@mui/joy/FormHelperText";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import RadioGroup from "@mui/joy/RadioGroup";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
/* ------------------------------- INTERFACES ------------------------------- */
import { IUser } from "../../interfaces/IUser";
import { IUpdateUser } from "../../interfaces/IUserUpdate";
import { UserRoleEnum } from "../../enum/UserRoleEnum";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditAccount = ({ user }: { user: IUser }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, control, getValues } =
    useForm<IUpdateUser>({
      mode: "onTouched",
    });
  const { errors } = formState;

  /* ------------------------------ USE MUTATION ------------------------------ */
  const {
    mutate: mutateUpdate,
    isLoading,
    isError,
    error,
  } = useMutation((payload: IUpdateUser) => updateUser(user.id, payload), {
    onSuccess: async (data) => {
      setUser(data);
      toast.success("Informations mises à jour", { style: TOAST_STYLE });
    },
  });

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onSubmit: SubmitHandler<IUpdateUser> = async (payload) => {
    if (!getValues("email")) {
      payload.email = user.email;
    }
    mutateUpdate(parseUserForm({ ...user, ...payload }));
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError &&
        error instanceof Error &&
        error.message.split(",").map((msg, index) => (
          <Alert
            key={index}
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        ))}

      <FormControl>
        <FormLabel>Role</FormLabel>
        <Controller
          name="role"
          control={control}
          defaultValue={user.role}
          render={({ field: { onChange, ...field } }) => (
            <RadioGroup
              aria-labelledby="account-role-label"
              {...field}
              onChange={(event) => {
                onChange(event);
              }}
            >
              <Box display="flex" gap="10px">
                <Radio
                  label="Je cherche un logement"
                  value={UserRoleEnum.SEEKER}
                  variant="soft"
                  disableIcon
                />
                <Radio
                  label="Je propose un logement"
                  value={UserRoleEnum.OWNER}
                  variant="soft"
                  disableIcon
                />
              </Box>
            </RadioGroup>
          )}
        />
        {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" variant="soft" value={user.email} readOnly />
      </FormControl>

      <FormControl error={!!errors.email}>
        <FormLabel>Nouvelle adresse email</FormLabel>
        <FormHelperText sx={{ marginTop: "-5px", marginBottom: "10px" }}>
          Votre adresse email précédente continuera d'être associée à votre
          compte tant que vous n'aurez pas confirmé la nouvelle.
        </FormHelperText>
        <Input
          type="email"
          variant="soft"
          {...register("email", {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Vous devez renseigner une adresse email valide",
            },
          })}
        />
        {errors.email && (
          <FormHelperText>{errors.email.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.password}>
        <FormLabel>Nouveau mot de passe</FormLabel>
        <Input
          type="password"
          variant="soft"
          {...register("password", {
            minLength: {
              value: 8,
              message: "8 caractères minimum",
            },
            maxLength: {
              value: 20,
              message: "20 caractères maximum",
            },
          })}
        />
        {errors.password && (
          <FormHelperText>{errors.password.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>Suppression du compte</FormLabel>
        <Button
          color="danger"
          variant="soft"
          onClick={() => setOpenDeleteAccount(true)}
          sx={{ maxWidth: "max-content" }}
        >
          Supprimer mon compte
        </Button>
      </FormControl>

      {!isLoading && <Button type="submit">Enregistrer</Button>}
      {isLoading && (
        <Button disabled>
          <CircularProgress color="danger" thickness={3} />
        </Button>
      )}

      {/** Delete Account */}
      <Modal
        open={openDeleteAccount}
        onClose={() => setOpenDeleteAccount(false)}
      >
        <ModalDialog size="lg" aria-labelledby="close-modal-delete-account">
          <ModalClose />
          <ModalLayout title="Supprimer mon compte">
            <DeleteAccount
              setOpenDeleteAccount={setOpenDeleteAccount}
              user={user}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </form>
  );
};

export default EditAccount;
