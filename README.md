# fastify-app-runner

Fastify 앱을 AWS App Runner에 올리고 AWS Aurora와 연결하는 예시입니다.

DB는 AWS RDS MySQL을 사용합니다.

## How to start

### 셋업 준비

디펜던시를 설치해주세요.
`pnpm i`

`.env.local` 파일과 `.env.prd` 파일을 아래와 같이 생성해주세요.

```txt
SERVER_HOST=
SERVER_PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

AWS_ACCOUNT_ID=
AWS_REGION=       # ap-northeast-1 서울 리전
```

### 로컬 환경

docker compose 를 사용하여 개발환경을 설정합니다.

```bash
ENV=local make compose-start
```

AWS RDS를 생성하여 연결한 경우 사용합니다.

```bash
ENV=prd make docker-start
```

### 배포

Amazon ECR로 이미지를 빌드하고 푸쉬합니다.

```bash
ENV=prd make ecr-push
```
