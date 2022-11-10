/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextApiRequest } from "next";
import formidable from "formidable";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
const parseFormData = async (
  req: NextApiRequest,
  multiples: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise(function (resolve) {
    const form = formidable({ multiples });
    form.parse(
      req,
      async (error, fields: formidable.Fields, files: formidable.Files) => {
        if (error) {
          throw new Error("An error occured while parsing the request");
        }
        resolve({
          fields,
          files,
        });
      }
    );
  });
};

export default parseFormData;
