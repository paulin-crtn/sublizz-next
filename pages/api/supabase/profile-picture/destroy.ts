/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

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
  // Remove file from Supabase
  const { data, error } = await supabase.storage
    .from("lease-images")
    .remove(req.body);
  if (error) {
    throw new Error(error.message);
  }
  return res.json(data) as unknown as string;
}
