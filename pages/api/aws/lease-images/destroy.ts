/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const AWS_ID = process.env.AWS_ID;
const AWS_SECRET = process.env.AWS_SECRET;

/* -------------------------------------------------------------------------- */
/*                                API ENDPOINT                                */
/* -------------------------------------------------------------------------- */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Check that AWS keys are provided
  if (!AWS_ID || !AWS_SECRET) {
    throw new Error("AWS_ID or AWS_SECRET is missing");
  }
  // Create an AWS client for interacting with storage
  const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
  });
  // Setting up S3 parameters
  const params = {
    Bucket: "lacartedeslogements-lease-images",
    Delete: {
      Objects: req.body.map((fileName: string) => ({
        Key: process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER + "/" + fileName, // Folder + Filename
      })),
    },
  };
  // Remove file from AWS
  await s3
    .deleteObjects(params)
    .promise()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}
