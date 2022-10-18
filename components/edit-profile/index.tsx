/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/joy/CircularProgress";
import Textarea from "@mui/joy/Textarea";
import FormHelperText from "@mui/joy/FormHelperText";
import { updateUser } from "../../utils/featchUser";
import { useAuth } from "../../context/auth.context";
import { useAlert } from "../../context/alert.context";
import { IUser } from "../../interfaces/IUser";
import { IUpdateUser } from "../../interfaces/IUpdateUser";
import Chip from "@mui/joy/Chip";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditProfile = ({ user }: { user: IUser }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();
  const { success } = useAlert();

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<IUpdateUser>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (payload: IUpdateUser) => updateUser(user.id, payload),
    {
      onSuccess: async (data) => {
        setUser(data);
        success("Profil mis à jour");
      },
    }
  );

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<IUpdateUser> = async (payload) => {
    mutate({ ...user, ...payload });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError &&
        error instanceof Error &&
        error.message.split(",").map((msg) => (
          <Alert
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        ))}

      <FormControl error={!!errors.firstName}>
        <FormLabel>Prénom</FormLabel>
        <Input
          type="text"
          variant="soft"
          defaultValue={user.firstName}
          {...register("firstName", {
            required: "Ce champs est requis",
            minLength: {
              value: 3,
              message: "3 caractères minimum",
            },
            maxLength: {
              value: 30,
              message: "30 caractères maximum",
            },
          })}
        />
        {errors.firstName && (
          <FormHelperText>{errors.firstName.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.lastName}>
        <FormLabel>
          Nom
          <Chip
            size="sm"
            color="info"
            variant="soft"
            sx={{ marginLeft: 1, fontWeight: 400 }}
          >
            Optionnel
          </Chip>
        </FormLabel>
        <Input
          type="text"
          variant="soft"
          defaultValue={user.lastName}
          {...register("lastName", {
            minLength: {
              value: 3,
              message: "3 caractères minimum",
            },
            maxLength: {
              value: 30,
              message: "30 caractères maximum",
            },
          })}
        />
        {errors.lastName && (
          <FormHelperText>{errors.lastName.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>
          Message type
          <Chip
            size="sm"
            color="info"
            variant="soft"
            sx={{ marginLeft: 1, fontWeight: 400 }}
          >
            Optionnel
          </Chip>
        </FormLabel>
        <FormHelperText sx={{ marginTop: "-5px", marginBottom: "10px" }}>
          Répondez aux annonces plus rapidement en utilisant un modèle
          prédéfini.
        </FormHelperText>
        <Textarea
          variant="soft"
          defaultValue={user.standardMessage}
          {...register("standardMessage")}
          minRows={5}
          maxRows={5}
        />
      </FormControl>

      {!isLoading && <Button type="submit">Enregistrer</Button>}
      {isLoading && (
        <Button disabled>
          <CircularProgress color="danger" thickness={3} />
        </Button>
      )}
    </form>
  );
};

export default EditProfile;
