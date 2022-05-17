const dotenv = require("dotenv");
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "us-east-2";
const bucketName = "upstudy.io-s3";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//get s3 connection object to work with
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});

//create secure url that the client can use to post images to the s3 bucket
module.exports = {
    generateUploadURL: async function () {
        const rawBytes = await randomBytes(16);
        const imageName = rawBytes.toString("hex");

        const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
        };
        //upload image to s3 bucket and return the URL
        const uploadURL = await s3.getSignedUrlPromise("putObject", params);
        return uploadURL;
    },
};
