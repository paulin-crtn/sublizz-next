/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/joy/CircularProgress";
import { TOAST_STYLE } from "../../const/toastStyle";
import toast from "react-hot-toast";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import DeleteIcon from "@mui/icons-material/Delete";
import compressFile from "../../utils/compressFile";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseInputFile = ({
  leaseImages,
  setLeaseImagesToRemove,
  setInputFileError,
  inputFiles,
  setInputFiles,
  index,
}: {
  leaseImages: string[];
  setLeaseImagesToRemove: Dispatch<SetStateAction<string[]>>;
  setInputFileError: Dispatch<SetStateAction<string | undefined>>;
  inputFiles: File[] | Blob[];
  setInputFiles: Dispatch<SetStateAction<File[] | Blob[]>>;
  index: number;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [isDeletingFile, setIsDeletingFile] = useState<boolean>(false);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onAdd = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    // Check inputFile
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

    // Compress inputFile
    const compressedFile = await compressFile(file);

    // Replace previous inputFile by new inputFile (at the same index)
    const newInputFiles = [...inputFiles];
    newInputFiles[index] = compressedFile;
    setInputFiles([...newInputFiles]);

    // If inputFile replace a stored file, add the stored file to setLeaseImagesToRemove
    if (leaseImages[index]) {
      setLeaseImagesToRemove((leaseImagesToRemove) => [
        ...new Set([...leaseImagesToRemove, leaseImages[index]]),
      ]);
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
          {!inputFiles[index] && !leaseImages[index] && (
            <AspectRatio ratio={1}>
              <Typography fontSize="3rem" sx={{ color: "#cccccc" }}>
                <AddIcon />
              </Typography>
            </AspectRatio>
          )}
          {!inputFiles[index] && leaseImages[index] && (
            <Card sx={{ width: 150, height: 150, boxShadow: "none" }}>
              <CardCover>
                <img
                  src={
                    leaseImages[index]
                      ? LEASE_IMAGE_PATH + "/" + leaseImages[index]
                      : undefined
                  }
                />
              </CardCover>
            </Card>
          )}
          {inputFiles[index] && (
            <Card sx={{ width: 150, height: 150, boxShadow: "none" }}>
              <CardCover>
                <img src={URL.createObjectURL(inputFiles[index])} />
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
