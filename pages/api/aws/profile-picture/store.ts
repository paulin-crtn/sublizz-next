/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
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
const AWS_ID = process.env.AWS_ID;
const AWS_SECRET = process.env.AWS_SECRET;
const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

/* -------------------------------------------------------------------------- */
/*                                API ENDPOINT                                */
/* -------------------------------------------------------------------------- */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string> {
  // Check that AWS environment variables are provided
  if (!AWS_ID || !AWS_SECRET) {
    throw new Error("AWS_ID or AWS_SECRET is missing");
  }
  if (!AWS_BUCKET_NAME) {
    throw new Error("NEXT_PUBLIC_AWS_BUCKET_NAME is missing");
  }
  // Create an AWS client for interacting with storage
  const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
  });
  // Parse request
  const { fields, files } = await parseFormData(req, false);
  // Rebuild file
  const persistentFile = (files.profilePicture as any[])[0];
  const file = fs.readFileSync(persistentFile.filepath);
  const fileName = fields.fileName[0];
  // Setting up S3 parameters
  const params = {
    Bucket: AWS_BUCKET_NAME,
    ContentType: persistentFile.mimetype ?? undefined,
    Key: "user-profile-pictures/" + fileName, // Folder + Filename
    Body: file,
  };
  // Upload file to Supabase
  await s3
    .upload(params)
    .promise()
    .catch((err) => {
      throw new Error(err.message);
    });
  // Return fileName
  return res.json(fileName) as unknown as string;
}
