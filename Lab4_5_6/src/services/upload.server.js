const { s3 } = require("../configs/aws.helper")
// function upload to S3
const uploadToS3 = (file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        // ACL: 'public-read',
        ContentType: file.minetype
    };
    return s3.upload(params).promise();
};

module.exports = {uploadToS3}