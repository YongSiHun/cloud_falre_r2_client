import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { PassThrough, Stream } from "stream";
import fs from "fs";
import path from "path";
import CloudFlareR2Client from "./cloud_flare_r2_client";
import config from "../config.json";

export default class CloudFlareDownloadService {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly downloadPath: string;

  constructor() {
    this.client = new CloudFlareR2Client().s3Client;
    this.bucket = process.env.CLOUD_FLARE_RESOURCE_BUCKET as string;
    this.downloadPath = config.downloadDirPath;
  }

  public async downloadAllFiles() {
    const resourceList = await this.getObjectResource();

    if (!resourceList?.length) {
      console.log("Resoure list is not exist in bucket");
      return;
    }

    for await (const resource of resourceList) {
      if (resource.Key) {
        await this.download(resource.Key as string);
      }
    }
  }

  private async getObjectResource() {
    const command = new ListObjectsV2Command({ Bucket: this.bucket });

    const response = await this.client.send(command);

    return response.Contents;
  }

  private async download(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });

    const response = await this.client.send(command);

    await this.createFile(fileName, response.Body as Stream);
  }

  private async createFile(fileName: string, streamData: Stream) {
    if (!fs.existsSync(this.downloadPath)) {
      fs.mkdirSync(this.downloadPath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(
        path.join(this.downloadPath, fileName)
      );

      const passThroughStream = new PassThrough();
      streamData.pipe(passThroughStream).pipe(fileStream);

      fileStream.on("finish", () => {
        console.log("Success downloaded %s", fileName);
        resolve("success");
      });

      fileStream.on("error", (err) => {
        console.log("Failed to download %s. %s", fileName, err);
        reject(err);
      });
    });
  }
}
