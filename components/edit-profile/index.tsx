/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
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
import { TOAST_STYLE } from "../../const/toastStyle";
import toast from "react-hot-toast";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/joy/Box";
import compressFile from "../../utils/compressFile";
import { IUser } from "../../interfaces/IUser";
import { IUpdateUser } from "../../interfaces/IUserUpdate";
import { PROFILE_PICTURE_PATH } from "../../const/profilePicturePath";
import { store, destroy } from "../../utils/fetch/fetchProfilePicture";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditProfile = ({ user }: { user: IUser }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [inputFile, setInputFile] = useState<File | undefined>();
  const [inputFileError, setInputFileError] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormData | undefined>();
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [isDeletingFile, setIsDeletingFile] = useState<boolean>(false);

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
  const onAddInputFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.size > 5000000) {
      setInputFileError("Le fichier doit faire moins de 5MB");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setInputFileError("Le fichier doit être au format JPG, JPEG ou PNG.");
      return;
    }
    setInputFile(file);
    await buildFormData(file);
  };

  const buildFormData = async (file: File): Promise<void> => {
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

  const onDeleteProfilePicture = async (): Promise<void> => {
    setInputFile(undefined);
    setFormData(undefined);
    if (user.profilePictureName) {
      try {
        setIsDeletingFile(true);
        const fileName = user.profilePictureName.split("?")[0]; // Remove ?t=date
        await destroy(fileName);
        const updatedUser = await updateUser(user.id, {
          ...user,
          profilePictureName: null,
        });
        setUser(updatedUser);
        toast.success("Photo de profil supprimée", { style: TOAST_STYLE });
      } catch (err) {
        err instanceof Error
          ? toast.error(err.message, { style: TOAST_STYLE })
          : toast.error("An error occured while removing the file", {
              style: TOAST_STYLE,
            });
      } finally {
        setIsDeletingFile(false);
      }
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    // Prevent default
    e.preventDefault();
    // Upload file
    if (formData) {
      try {
        setIsUploadingFile(true);
        const fileName = await store(formData);
        /**
         * ?t=date is used in order to handle/bust Supabase cache
         * https://github.com/supabase/supabase/discussions/5737
         */
        const fileNameTimestamped = fileName + "?=t" + Date.now();
        setValue("profilePictureName", fileNameTimestamped);
      } catch (err) {
        err instanceof Error
          ? toast.error(err.message, { style: TOAST_STYLE })
          : toast.error("An error occured while uploading the file", {
              style: TOAST_STYLE,
            });
      } finally {
        setFormData(undefined); // Avoid uploading twice if user continue to edit/save its profile
        setIsUploadingFile(false);
      }
    }
    // Submit form
    handleSubmit(mutateSubmit)();
  };

  const mutateSubmit: SubmitHandler<IUpdateUser> = async (payload) => {
    mutate({ ...user, ...payload });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={onSubmit}>
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

      {inputFileError && (
        <Typography>
          <Alert
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {inputFileError}
          </Alert>
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 6 }}>
        <Box sx={{ flex: "1 1" }}>
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

          {!isUploadingFile && !isLoading && (
            <Button type="submit">Enregistrer</Button>
          )}
          {(isUploadingFile || isLoading) && (
            <Button disabled>
              <CircularProgress color="danger" thickness={3} />
            </Button>
          )}
        </Box>

        <FormControl sx={{ flex: "0 0" }}>
          <FormLabel>
            Photo
            <Chip
              size="sm"
              color="info"
              variant="soft"
              sx={{ marginLeft: 1, fontWeight: 400 }}
            >
              Optionnel
            </Chip>
          </FormLabel>
          <FormHelperText sx={{ marginBottom: "15px" }}>
            Format : JPG ou PNG. Poids max : 5Mo.
          </FormHelperText>
          <FormLabel>
            <Input
              type="file"
              sx={{ display: "none" }}
              onChange={onAddInputFile}
            />
            <Sheet
              sx={{
                width: 150,
                borderRadius: "9999px",
                overflow: "auto",
                cursor: "pointer",
              }}
            >
              {!inputFile && !user.profilePictureName && (
                <AspectRatio ratio={1}>
                  <Typography fontSize="3rem" sx={{ color: "#cccccc" }}>
                    <AddIcon />
                  </Typography>
                </AspectRatio>
              )}
              {!inputFile && user.profilePictureName && (
                <Card sx={{ width: 150, height: 150, boxShadow: "none" }}>
                  <CardCover>
                    <img
                      src={
                        user?.profilePictureName
                          ? PROFILE_PICTURE_PATH +
                            "/" +
                            user?.profilePictureName
                          : undefined
                      }
                    />
                  </CardCover>
                </Card>
              )}
              {inputFile && (
                <Card sx={{ width: 150, height: 150, boxShadow: "none" }}>
                  <CardCover>
                    <img src={URL.createObjectURL(inputFile)} />
                  </CardCover>
                </Card>
              )}
            </Sheet>
          </FormLabel>
          {!isDeletingFile && (
            <Button
              variant="outlined"
              color="neutral"
              size="sm"
              fullWidth
              onClick={onDeleteProfilePicture}
              startDecorator={<DeleteIcon />}
            >
              Supprimer
            </Button>
          )}
          {isDeletingFile && (
            <Button
              variant="outlined"
              color="neutral"
              size="sm"
              fullWidth
              disabled
            >
              <CircularProgress color="neutral" thickness={3} />
            </Button>
          )}
        </FormControl>
      </Box>
    </form>
  );
};

export default EditProfile;
