/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/joy/CircularProgress";
import Textarea from "@mui/joy/Textarea";
import FormHelperText from "@mui/joy/FormHelperText";
import { updateUser } from "../../utils/fetch/fetchUser";
import { useAuth } from "../../context/auth.context";
import Chip from "@mui/joy/Chip";
import { TOAST_STYLE } from "../../const/toast";
import toast from "react-hot-toast";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import compressFile from "../../utils/compressFile";
import { IUser } from "../../interfaces/IUser";
import { IUpdateUser } from "../../interfaces/IUpdateUser";
import { PROFILE_PICTURE_PATH } from "../../const/profilePicturePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditProfile = ({ user }: { user: IUser }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [file, setFile] = useState<File | undefined>();
  const [fileError, setFileError] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormData | undefined>();

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, setValue } = useForm<IUpdateUser>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error } = useMutation(
    (payload: IUpdateUser) => updateUser(user.id, payload),
    {
      onSuccess: async (data) => {
        setUser(data);
        toast.success("Profil mis à jour", { style: TOAST_STYLE });
      },
    }
  );

  /* -------------------------------- FUNCTION -------------------------------- */
  const handleFile = async (file: File) => {
    if (!file) return;
    if (file.size > 5000000) {
      setFileError("Le fichier doit faire moins de 5MB");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setFileError("Le fichier doit être au format JPG, JPEG ou PNG.");
      return;
    }
    setFile(file);
    await buildFormData(file);
  };

  const buildFormData = async (file: File) => {
    try {
      const compressedFile = await compressFile(file);
      const formData = new FormData();
      formData.append("profilePicture", compressedFile);
      formData.append("fileName", `user_${user.id}.jpeg`);
      setFormData(formData);
    } catch (err) {
      err instanceof Error
        ? toast.error(err.message, { style: TOAST_STYLE })
        : toast.error("An error occured while compressing the file", {
            style: TOAST_STYLE,
          });
    }
  };

  const uploadProfilePicture = async (formData: FormData): Promise<string> => {
    const response = await fetch("/api/supabase/upload-user-profile-picture", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  };

  const onSubmit: SubmitHandler<IUpdateUser> = async (payload) => {
    mutate({ ...user, ...payload });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // Upload file
        try {
          if (formData) {
            const fileName = await uploadProfilePicture(formData);
            setValue("profilePictureName", fileName);
          }
        } catch (err) {
          err instanceof Error
            ? toast.error(err.message, { style: TOAST_STYLE })
            : toast.error("An error occured while uploading the file", {
                style: TOAST_STYLE,
              });
        }
        // Validate and submit form
        handleSubmit(onSubmit)();
      }}
    >
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

      {fileError && <Typography>{fileError}</Typography>}

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
          Photo de profil
          <Chip
            size="sm"
            color="info"
            variant="soft"
            sx={{ marginLeft: 1, fontWeight: 400 }}
          >
            Optionnel
          </Chip>
        </FormLabel>
        <label>
          <Input
            type="file"
            name="file"
            sx={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                handleFile(e.target.files[0]);
              }
            }}
          />
          <Sheet
            sx={{
              width: 150,
              borderRadius: "md",
              overflow: "auto",
              cursor: "pointer",
            }}
          >
            {!file && !user.profilePictureName && (
              <AspectRatio ratio={1}>
                <Typography fontSize="3rem" sx={{ color: "#cccccc" }}>
                  <AddIcon />
                </Typography>
              </AspectRatio>
            )}
            {!file && user.profilePictureName && (
              <Card sx={{ width: 150, height: 150 }}>
                <CardCover>
                  <img
                    src={
                      user?.profilePictureName
                        ? PROFILE_PICTURE_PATH + "/" + user?.profilePictureName
                        : undefined
                    }
                  />
                </CardCover>
              </Card>
            )}
            {file && (
              <Card sx={{ width: 150, height: 150 }}>
                <CardCover>
                  <img src={URL.createObjectURL(file)} />
                </CardCover>
              </Card>
            )}
          </Sheet>
        </label>
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
          Répondez aux annonces plus rapidement en rédigeant un modèle
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
