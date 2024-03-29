/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import compressFile from "../../../../../utils/compressFile";
import { updateUser } from "../../../../../utils/fetch/fetchUser";
import {
  storeProfilePicture,
  destroyProfilePicture,
} from "../../../../../utils/fetch/fetchProfilePicture";
import parseUserForm from "../../../../../utils/parseUserForm";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import Optional from "../../../../shared/optional";
import LoadingIndicator from "../../../../shared/loading-indicator";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import CircularProgress from "@mui/joy/CircularProgress";
import Textarea from "@mui/joy/Textarea";
import FormHelperText from "@mui/joy/FormHelperText";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
/* ---------------------------------- ICONS --------------------------------- */
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
/* ------------------------------- INTERFACES ------------------------------- */
import { IUpdateUser } from "../../../../../interfaces/IUserUpdate";
/* ---------------------------------- CONST --------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../../../const/objectStoragePath";
import { TOAST_STYLE } from "../../../../../const/toastStyle";
import { UserRoleEnum } from "../../../../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditProfile = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user, setUser } = useAuth();
  if (!user) throw new Error("user cannot be null");

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [inputFile, setInputFile] = useState<File | Blob | undefined>();
  const [hasInputFileError, setHasInputFileError] = useState<boolean>(false);
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
        setInputFile(undefined); // Avoid uploading twice if user continue to edit/save its profile
        toast.success("Profil mis à jour", { style: TOAST_STYLE });
        router.push("/dashboard");
      },
    }
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onAddInputFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setHasInputFileError(false);
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (file.size > 5000000) {
      setHasInputFileError(true);
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setHasInputFileError(true);
      return;
    }
    const compressedFile = await compressFile(file);
    setInputFile(compressedFile);
  };

  const buildFormData = (file: File | Blob): FormData => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("fileName", `user_${user.id}.jpg`);
    return formData;
  };

  const onDeleteProfilePicture = async (): Promise<void> => {
    setInputFile(undefined);
    if (user.profilePictureName) {
      try {
        setIsDeletingFile(true);
        const fileName = user.profilePictureName.split("?")[0]; // Remove ?t=date
        await destroyProfilePicture(fileName);
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
    if (inputFile) {
      try {
        setIsUploadingFile(true);
        const formData = buildFormData(inputFile);
        const fileName = await storeProfilePicture(formData);
        /**
         * ?t=date is used in order to handle/bust Supabase cache
         * https://github.com/supabase/supabase/discussions/5737
         */
        const fileNameTimestamped = fileName + "?t=" + Date.now();
        setValue("profilePictureName", fileNameTimestamped);
      } catch (err) {
        err instanceof Error
          ? toast.error(err.message, { style: TOAST_STYLE })
          : toast.error("An error occured while uploading the file", {
              style: TOAST_STYLE,
            });
      } finally {
        setIsUploadingFile(false);
      }
    }
    // Submit form
    handleSubmit(mutateSubmit)();
  };

  const mutateSubmit: SubmitHandler<IUpdateUser> = async (payload) => {
    mutate(parseUserForm({ ...user, ...payload }));
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
            color="danger"
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        ))}

      <Box>
        <FormControl sx={{ flex: "0 0" }}>
          <FormLabel>
            Photo <Optional />
          </FormLabel>
          <FormHelperText
            sx={{
              marginTop: "-5px",
              marginBottom: "10px",
              color: hasInputFileError ? "#d3232f" : "auto",
            }}
          >
            Format : JPG ou PNG. Poids max : 5Mo.
          </FormHelperText>
          <FormLabel sx={{ marginBottom: 0 }}>
            <Input
              type="file"
              sx={{ display: "none" }}
              onChange={onAddInputFile}
            />
            <Sheet
              sx={{
                width: 120,
                borderRadius: "8px",
                overflow: "auto",
                cursor: "pointer",
              }}
            >
              {!inputFile && !user.profilePictureName && (
                <AspectRatio ratio={1} variant="solid">
                  <Typography fontSize="3rem" sx={{ color: "#cccccc" }}>
                    <AddIcon />
                  </Typography>
                </AspectRatio>
              )}
              {!inputFile && user.profilePictureName && (
                <Card sx={{ width: 120, height: 120, boxShadow: "none" }}>
                  <CardCover>
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                      src={
                        PROFILE_PICTURE_PATH + "/" + user?.profilePictureName
                      }
                      alt="supabase user image"
                    />
                  </CardCover>
                </Card>
              )}
              {inputFile && (
                <Card sx={{ width: 120, height: 120, boxShadow: "none" }}>
                  <CardCover>
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(inputFile)}
                      alt="input user image"
                    />
                  </CardCover>
                </Card>
              )}
            </Sheet>
          </FormLabel>
          <IconButton
            size="sm"
            disabled={isDeletingFile ? true : false}
            onClick={onDeleteProfilePicture}
            sx={{
              position: "absolute",
              bottom: "-10px",
              left: "100px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#ffffff",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
              "&:active": {
                backgroundColor: "#eeeeee",
              },
            }}
          >
            {isDeletingFile ? (
              <CircularProgress color="neutral" />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
        </FormControl>

        <FormControl error={!!errors.firstName}>
          <FormLabel>Prénom</FormLabel>
          <Input
            type="text"
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
            Nom <Optional />
          </FormLabel>
          <Input
            type="text"
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

        {user.role === UserRoleEnum.OWNER && (
          <FormControl error={!!errors.phoneNumber}>
            <FormLabel>
              Numéro de téléphone <Optional />
            </FormLabel>
            <FormHelperText
              sx={{ marginTop: "-5px", marginBottom: "10px", color: "#646872" }}
            >
              Le numéro sera affiché avec vos annonces.
            </FormHelperText>
            <Input
              type="text"
              defaultValue={user.phoneNumber}
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9]{1,10}$/g,
                  message:
                    "10 chiffres uniquement, sans espace ni indicatif pays.",
                },
              })}
            />
            {errors.phoneNumber && (
              <FormHelperText>{errors.phoneNumber.message}</FormHelperText>
            )}
          </FormControl>
        )}

        {user.role === UserRoleEnum.SEEKER && (
          <FormControl>
            <FormLabel>
              Message type <Optional />
            </FormLabel>
            <FormHelperText sx={{ marginTop: "-5px", marginBottom: "10px" }}>
              Répondez aux annonces plus rapidement en rédigeant un modèle
              prédéfini.
            </FormHelperText>
            <Textarea
              defaultValue={user.standardMessage}
              {...register("standardMessage")}
              minRows={5}
              maxRows={5}
            />
          </FormControl>
        )}

        <Button
          color="info"
          type="submit"
          loading={isUploadingFile || isLoading}
          loadingIndicator={<LoadingIndicator />}
          sx={{ mt: 2 }}
        >
          Enregistrer
        </Button>
      </Box>
    </form>
  );
};

export default EditProfile;
