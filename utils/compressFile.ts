/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Compressor from "compressorjs";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
const compressFile = async (file: File): Promise<File | Blob> => {
  return await new Promise(function (resolve) {
    new Compressor(file, {
      mimeType: "image/jpeg", // The mime type of the output image.
      convertTypes: ["image/png"],
      quality: 0.6,
      maxWidth: 1000,
      maxHeight: 1000,
      success(result) {
        resolve(result);
      },
      error(err) {
        throw new Error(err.message);
      },
    });
  });
};

export default compressFile;
