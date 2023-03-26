FROM node:19-alpine

WORKDIR /app

ADD . /app/

RUN npm i

ENV WATCHPACK_POLLING true

CMD npm run dev
