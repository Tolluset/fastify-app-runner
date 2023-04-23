# fastify-app-runner

Fastify 앱을 AWS App Runner에 올리고 AWS Aurora와 연결하는 예시입니다.

DB는 AWS RDS MySQL을 사용합니다.

## How to start

### 셋업 준비

디펜던시를 설치해주세요.
`pnpm i`

`.env.local` 파일과 `.env.prd` 파일을 아래와 같이 생성해주세요.

```txt
ex) .env.local

SERVER_HOST=0.0.0.0  # compose가 아니라 단일 도커의 경우 localhost
SERVER_PORT=8080

DB_HOST=mysql
DB_PORT=3306
DB_USERNAME={username}
DB_PASSWORD={password}
DB_DATABASE={database}


---

ex) .env.prd

SERVER_HOST=0.0.0.0
SERVER_PORT=8080

DB_HOST=mysql
DB_PORT=3306
DB_USERNAME={username}
DB_PASSWORD={password}
DB_DATABASE={database}

AWS_ACCOUNT_ID=123456789
AWS_REGION=ap-northeast-1
```

### 로컬 환경

docker compose 를 사용하여 개발환경을 설정합니다.

```bash
make compose-start
```

### 배포

Amazon ECR로 이미지를 빌드하고 푸쉬합니다.

```bash
ENV=prd make ecr-push
```
