SHELL = /bin/bash

docker-build: env-$${ENV}
	. .env.$${ENV}; \
    docker build -t fastify-app-runner . \
        --build-arg SERVER_HOST=$${SERVER_HOST} \
        --build-arg SERVER_PORT=$${SERVER_PORT} \
        --build-arg DB_HOST=$${DB_HOST} \
        --build-arg DB_PORT=$${DB_PORT} \
        --build-arg DB_USERNAME=$${DB_USERNAME} \
        --build-arg DB_PASSWORD=$${DB_PASSWORD} \
        --build-arg DB_DATABASE=$${DB_DATABASE}

docker-start: env-$${ENV}
	ENV=$${ENV} make docker-build; \
	docker run -p 8080:8080 fastify-app-runner

compose-start:
	docker compose build && docker compose up

compose-down:
	docker compose down

ecr-login: env-$${ENV}
	. .env.${ENV}; \
	aws ecr get-login-password --region $${AWS_REGION} | docker login --username AWS --password-stdin $${AWS_ACCOUNT_ID}.dkr.ecr.$${AWS_REGION}.amazonaws.com
	
ecr-push: env-$${ENV}
	. .env.$${ENV}; \
	ENV=$${ENV} make docker-build; \
	docker tag fastify-app-runner:latest $${AWS_ACCOUNT_ID}.dkr.ecr.$${AWS_REGION}.amazonaws.com/fastify-app-runner:latest; \
	docker push $${AWS_ACCOUNT_ID}.dkr.ecr.$${AWS_REGION}.amazonaws.com/fastify-app-runner:latest

env-%:
	@if [ ! -f .env.$* ]; then \
		echo "Environment .env.$* file not found"; \
		exit 1; \
	fi

.PHONY: \
	env-% 		  \
	docker-build  \ 
	docker-start  \
	compose-start \
	compose-down  \
	ecr-login 	  \
	ecr-push
