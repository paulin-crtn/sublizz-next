/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { ChangeEvent, Dispatch, SetStateAction } from "react";
/* ---------------------------------- UTILS --------------------------------- */
import compressFile from "../../../../../../utils/compressFile";
/* ----------------------------------- MUI ---------------------------------- */
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import AddIcon from "@mui/icons-material/Add";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
/* -------------------------------- CONSTANTS ------------------------------- */
import { LEASE_IMAGE_PATH } from "../../../../../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseInputFile = ({
  leaseImages,
  setLeaseImagesToRemove,
  setHasInputFileError,
  inputFiles,
  setInputFiles,
  index,
}: {
  leaseImages: string[];
  setLeaseImagesToRemove: Dispatch<SetStateAction<string[]>>;
  setHasInputFileError: Dispatch<SetStateAction<boolean>>;
  inputFiles: File[] | Blob[];
  setInputFiles: Dispatch<SetStateAction<File[] | Blob[]>>;
  index: number;
}) => {
  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onAdd = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setHasInputFileError(false);
    // Check inputFile
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.size > 5000000) {
      setHasInputFileError(true);
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setHasInputFileError(true);
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
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={
                    leaseImages[index]
                      ? LEASE_IMAGE_PATH + "/" + leaseImages[index]
                      : undefined
                  }
                  alt="supabase lease image"
                />
              </CardCover>
            </Card>
          )}
          {inputFiles[index] && (
            <Card sx={{ width: 150, height: 150, boxShadow: "none" }}>
              <CardCover>
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(inputFiles[index])}
                  alt="input lease image"
                />
              </CardCover>
            </Card>
          )}
        </Sheet>
      </FormLabel>
    </>
  );
};

export default LeaseInputFile;
