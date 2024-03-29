/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import { updateUser } from "../../../../../utils/fetch/fetchUser";
import parseUserForm from "../../../../../utils/parseUserForm";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import ModalLayout from "../../../../shared/modal-layout";
import DeleteAccount from "./delete-account";
import LoadingIndicator from "../../../../shared/loading-indicator";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import FormHelperText from "@mui/joy/FormHelperText";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Box from "@mui/joy/Box";
/* ------------------------------- INTERFACES ------------------------------- */
import { IUpdateUser } from "../../../../../interfaces/IUserUpdate";
import { UserRoleEnum } from "../../../../../enum/UserRoleEnum";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../../../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditAccount = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user, setUser } = useAuth();
  if (!user) throw new Error("user cannot be null");

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

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
      router.push("/dashboard");
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
        <FormHelperText
          sx={{ marginTop: "-5px", marginBottom: "10px", color: "#646872" }}
        >
          Vous n'aurez pas accès aux mêmes fonctionnalités suivant le role
          selectionné.
        </FormHelperText>
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
                  variant="solid"
                  disableIcon
                />
                <Radio
                  label="Je propose un logement"
                  value={UserRoleEnum.OWNER}
                  variant="solid"
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
        <FormHelperText
          sx={{ marginTop: "-5px", marginBottom: "10px", color: "#646872" }}
        >
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

      <Box display="flex" gap={2} sx={{ mt: 4 }}>
        <Button
          color="info"
          loading={isLoading}
          loadingIndicator={<LoadingIndicator />}
          type="submit"
        >
          Enregistrer
        </Button>
        <Button
          color="danger"
          variant="plain"
          onClick={() => setOpenDeleteAccount(true)}
          sx={{ maxWidth: "max-content" }}
        >
          Supprimer mon compte
        </Button>
      </Box>

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
