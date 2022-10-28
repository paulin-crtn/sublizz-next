/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
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
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import {
  storeProfilePicture,
  destroyProfilePicture,
} from "../../utils/fetch/fetchProfilePicture";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseInputFile = ({
  fileName,
  storageFileName,
  formData,
  setFormData,
}: {
  fileName: string;
  storageFileName: string | undefined;
  formData: FormData | undefined;
  setFormData: Dispatch<SetStateAction<FormData | undefined>>;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [inputFile, setInputFile] = useState<File | undefined>();
  const [inputFileError, setInputFileError] = useState<string | undefined>();
  // const [formData, setFormData] = useState<FormData | undefined>();
  const [isDeletingFile, setIsDeletingFile] = useState<boolean>(false);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onAdd = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
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
      if (!formData) {
        formData = new FormData();
      }
      formData.append("leaseImages", compressedFile);
      formData.append("fileNames", fileName);
      setFormData(formData);
    } catch (err) {
      err instanceof Error
        ? toast.error(err.message, { style: TOAST_STYLE })
        : toast.error("An error occured while compressing the file", {
            style: TOAST_STYLE,
          });
    }
  };

  const onDelete = () => {};

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <FormLabel>
        <Input type="file" sx={{ display: "none" }} onChange={onAdd} />
        <Sheet
          sx={{
            width: 150,
            borderRadius: "10px",
            overflow: "auto",
            cursor: "pointer",
          }}
        >
          {!inputFile && !storageFileName && (
            <AspectRatio ratio={1}>
              <Typography fontSize="3rem" sx={{ color: "#cccccc" }}>
                <AddIcon />
              </Typography>
            </AspectRatio>
          )}
          {!inputFile && storageFileName && (
            <Card sx={{ width: 150, height: 150, boxShadow: "none" }}>
              <CardCover>
                <img
                  src={
                    storageFileName
                      ? PROFILE_PICTURE_PATH + "/" + storageFileName
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
          onClick={onDelete}
          startDecorator={<DeleteIcon />}
        >
          Supprimer
        </Button>
      )}
      {isDeletingFile && (
        <Button variant="outlined" color="neutral" size="sm" fullWidth disabled>
          <CircularProgress color="neutral" thickness={3} />
        </Button>
      )}
    </>
  );
};

export default LeaseInputFile;
