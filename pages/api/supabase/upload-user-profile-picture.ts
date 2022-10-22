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
/*                                API ENDPOINT                                */
/* -------------------------------------------------------------------------- */
export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{
  path: string;
}> {
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
  const { fields, files } = await _formidableParse(req);
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
  return res.json(response.data) as unknown as { path: string };
}

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _formidableParse = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise(function (resolve) {
    const form = formidable({ multiples: false });
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
