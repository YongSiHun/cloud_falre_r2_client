# cloud_falre_r2_client

클라우드 플레어 R2 스토리지 파일 업로드 및 다운로드 클라이언트

# requirement

#### .env

```bash

CLOUD_FLARE_R2_URL="R2 스토리지 Account Details > S3 API"
CLOUD_FLARE_RESOURCE_BUCKET="R2 스토리지 버킷 이름"
CLOUD_FLARE_ACCESS_KEY_ID="R2 스토리지 > Account Details > API Tokens > {} Manage > User API 토큰 생성 > 생성 후 액세스키 ID"
CLOUD_FLARE_SECRET_ACCESS_KEY="R2 스토리지 > Account Details > API Tokens > {} Manage > User API 토큰 생성 > 생성 후 비밀 액세스 키"
```

#### config.json

```json
{
  "downloadDirPath": "./download", // R2 스토리지로 부터 파일을 다운로드 받을 디렉터리 위치
  "uploadTargetFiles": ["./upload_test/test.txt", "./upload_test/test2.txt"] // R2 스토리지에 올릴 파일 목록
}
```

# execution

```bash
yarn install

yarn start
```
