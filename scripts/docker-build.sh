source .env &&
    docker build -t fastify-app-runner . \
        --build-arg SERVER_HOST=$SERVER_HOST \
        --build-arg SERVER_PORT=$SERVER_PORT \
        --build-arg DB_HOST=$DB_HOST \
        --build-arg DB_PORT=$DB_PORT \
        --build-arg DB_USERNAME=$DB_USERNAME \
        --build-arg DB_PASSWORD=$DB_PASSWORD \
        --build-arg DB_DATABASE=$DB_DATABASE
