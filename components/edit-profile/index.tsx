/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Compressor from "compressorjs";
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
import { updateUser } from "../../utils/featchUser";
import { useAuth } from "../../context/auth.context";
import { IUser } from "../../interfaces/IUser";
import { IUpdateUser } from "../../interfaces/IUpdateUser";
import Chip from "@mui/joy/Chip";
import { TOAST_STYLE } from "../../const/toast";
import toast from "react-hot-toast";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditProfile = ({ user }: { user: IUser }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();

  const [file, setFile] = useState<File | undefined>();
  const [fileError, setFileError] = useState<string | undefined>();

  const handleFile = (file: File) => {
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
  };

  useEffect(() => {
    if (!file) return;
    new Compressor(file, {
      mimeType: "image/jpeg", // The mime type of the output image.
      convertTypes: ["image/png"],
      quality: 0.6,
      maxWidth: 1000,
      maxHeight: 1000,
      success(result) {
        const formData = new FormData();
        formData.append("profilePicture", result);
        formData.append("fileName", "user_" + user.id + ".jpeg");

        const uploadUserProfilePicture = async () => {
          return await fetch("/api/supabase/upload-user-profile-picture", {
            method: "POST",
            body: formData,
          });
        };

        uploadUserProfilePicture()
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(
              "An error occured in uploadUserProfilePicture function"
            );
          })
          .then((data) => {
            console.log("data", data);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  }, [file]);

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, control } = useForm<IUpdateUser>({
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
  const onSubmit: SubmitHandler<IUpdateUser> = async (payload) => {
    console.log(payload);

    mutate({ ...user, ...payload });
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
        <FormLabel>Photo de profil</FormLabel>
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
              border: "2px dashed #cccccc",
              borderRadius: "md",
              overflow: "auto",
              cursor: "pointer",
            }}
          >
            {!file && (
              <AspectRatio ratio={1}>
                <Typography fontSize="3rem" sx={{ color: "#cccccc" }}>
                  <AddIcon />
                </Typography>
              </AspectRatio>
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
