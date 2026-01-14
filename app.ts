import "dotenv/config";
import {
  cloudFlareDownloadInstance,
  cloudFlareUploadInstance,
} from "./src";

/**
 * test
 */
async function main() {
  await cloudFlareDownloadInstance.downloadAllFiles();
  await cloudFlareUploadInstance.uploadAllFiles();
}

main();
