# fastify-app-runner

Fastify 앱을 AWS App Runner에 올리고 AWS Aurora와 연결하는 예시입니다.

## How to start

### 셋업 준비

디펜던시를 설치해주세요.
`pnpm i`

스크립트에 권한을 설정합니다.
`chmod -R +x scripts`

`.env` 파일을 생성해주세요.

모두 작성해야 할 필요는 없습니다. `src/constants/env.ts`를 참고 해주세요.

```txt
SERVER_HOST=
SERVER_PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=필수
DB_PASSWORD=필수
DB_DATABASE=

AWS_ACCOUNT_ID=필수
```

### 로컬 환경

docker compose 를 사용하여 개발환경을 설정합니다.

로컬 DB를 사용하는 경우

```bash
docker compose build
docker compose start
```

AWS RDS를 생성하여 연결한 경우

```bash
./scripts/docker-start.sh
```

### Production

Amazone ECR로 이미지를 빌드하고 푸쉬합니다. `.env` 파일에 AWS_ACCOOUNT_ID가 설정되어 있어야합니다.

```bash
./scripts/ecr-push.sh
```
