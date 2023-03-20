# fastify-app-runner example

Fastify 앱을 AWS App Runner에 올리고 AWS Aurora와 연결하는 예시입니다.


## How to start

`.env` 파일을 생성해주세요.

```txt
SERVER_HOST=
SERVER_PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

docker compose 를 사용하여 개발환경을 설정합니다.

```bash
docker compose build
docker compose start
```
