"use server";

import "dotenv/config";
import { config, S3 } from "aws-sdk";

config.update({
    region: "us-east-1",
    credentials: {
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    },
});

const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME ?? "";

export const listS3Objects = async () => {
    const s3 = new S3();
    const data = await s3.listObjectsV2({ Bucket: bucketName }).promise();

    if (data.$response.error) {
        throw new Error(data.$response.error.message);
    }

    return (
        data.Contents?.sort((a, b) => {
            if (!a.Key || !b.Key) {
                return 0;
            }

            if (a.Key < b.Key) {
                return -1;
            } else if (a.Key > b.Key) {
                return 1;
            }

            return 0;
        }) ?? []
    );
};
