scripts/docker-build.sh && source .env &&
    docker tag fastify-app-runner:latest $AWS_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com/fastify-app-runner:latest &&
    docker push $AWS_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com/fastify-app-runner:latest
