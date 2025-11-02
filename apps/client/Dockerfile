FROM node:20 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.2 --activate
RUN echo "nodeLinker: node-modules" > .yarnrc.yml

COPY . .

ARG ENV_MODE
ARG BACK_URL_DEV
ARG BACK_URL
ARG FRONT_URL_DEV
ARG FRONT_URL

RUN yarn install

RUN if [ "$ENV_MODE" = "development" ]; then \
      yarn build:dev && echo "🛠️ build DEV mode"; \
    elif [ "$ENV_MODE" = "test" ]; then \
      yarn build:test && echo "🧪 build TEST mode"; \
    else \
      yarn build && echo "🏛️ build PRODUCTION mode"; \
    fi

EXPOSE 3001

CMD ["yarn", "start"]
