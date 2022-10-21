/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */
/**
 * Disable NextJS bodyParser in order to parse formData with Formidable
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const SUPABASE_ANON_API_KEY = process.env.SUPABASE_ANON_API_KEY;
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Check that Supabase keys are provided
  if (!SUPABASE_ANON_API_KEY || !NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("You must provide SUPABASE keys in .env file");
  }
  // Create a Supabase client for interacting with storage
  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_API_KEY
  );
  // Parse request with Formidable package
  const form = formidable({ multiples: false });
  return form.parse(
    req,
    async (error, fields: formidable.Fields, files: formidable.Files) => {
      if (error) {
        throw new Error("An error occured while parsing the request");
      }
      if (!fields.fileName || !files.profilePicture) {
        throw new Error("No fileName or profilePicture found");
      }
      // Rebuild file
      const persistentFile = (files.profilePicture as any[])[0];
      const file = fs.readFileSync(persistentFile.filepath);
      const fileName = fields.fileName[0];
      // Upload file to Supabase
      const response = await supabase.storage
        .from("user-profile-picture")
        .upload(fileName, file, {
          upsert: true,
          contentType: "image/jpeg",
        });
      if (response.error) {
        throw new Error(response.error.message);
      }
      return res.send(response.data);
    }
  );
}
