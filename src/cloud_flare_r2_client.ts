import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

export default class CloudFlareR2Client {
  private _s3Client: S3Client;

  constructor() {
    this._s3Client = new S3Client({
      endpoint: process.env.CLOUD_FLARE_R2_URL as string,
      region: "auto",
      credentials: {
        accessKeyId: process.env.CLOUD_FLARE_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CLOUD_FLARE_SECRET_ACCESS_KEY as string,
      },
    });
  }

  get s3Client(): S3Client {
    return this._s3Client;
  }

  set s3Client(config: S3ClientConfig) {
    this._s3Client = new S3Client(config);
  }
}
