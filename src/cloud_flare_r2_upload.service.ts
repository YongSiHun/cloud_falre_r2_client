import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import CloudFlareR2Client from "./cloud_flare_r2_client";
import config from "../config.json";

export default class CloudflareUploadService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.client = new CloudFlareR2Client().s3Client;
    this.bucket = process.env.CLOUD_FLARE_RESOURCE_BUCKET as string;
  }

  public async uploadAllFiles() {
    const resourceFiles = config.uploadTargetFiles;

    for await (const resourceFile of resourceFiles) {
      if (!fs.existsSync(path.join(resourceFile))) {
        console.log("Resource file not exist: %s", resourceFile);
        continue;
      }

      await this.upload(resourceFile);
    }
  }

  private async upload(fileName: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, async (err, data) => {
        if (err) {
          reject(err);
        }

        const command = new PutObjectCommand({
          Bucket: this.bucket,
          Key: fileName.split(/\\|\//).pop() as string, // 파일명만 추출
          Body: data,
          ContentType: "--", // realm 파일 생성 후 매뉴얼 업로드 할 때와 동일하게 설정
        });

        await this.client.send(command);

        console.log("%s upload complete", fileName);
        resolve("success");
      });
    });
  }
}
