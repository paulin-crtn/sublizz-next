/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import parseFormData from "../../../../utils/parseFormData";

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
): Promise<string> {
  // Check that Supabase keys are provided
  if (!SUPABASE_ANON_API_KEY || !NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("You must provide SUPABASE keys in .env file");
  }
  // Create a Supabase client for interacting with storage
  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_API_KEY
  );
  // Parse request
  const { fields, files } = await parseFormData(req, false);
  // Rebuild file
  const persistentFile = (files.profilePicture as any[])[0];
  const file = fs.readFileSync(persistentFile.filepath);
  const fileName = fields.fileName[0];
  // Upload file to Supabase
  const { data, error } = await supabase.storage
    .from("lease-images")
    .upload(fileName, file, {
      upsert: true,
      contentType: "image/jpeg",
    });
  if (error) {
    throw new Error(error.message);
  }
  return res.json(data.path) as unknown as string;
}
