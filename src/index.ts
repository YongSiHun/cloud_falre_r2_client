import CloudFlareR2Client from "./cloud_flare_r2_client";
import CloudFlareDownloadService from "./cloud_flare_r2_download.service";
import CloudflareUploadService from "./cloud_flare_r2_upload.service";

export const cloudFlareInstance = new CloudFlareR2Client();
export const cloudFlareDownloadInstance = new CloudFlareDownloadService();
export const cloudFlareUploadInstance = new CloudflareUploadService();
