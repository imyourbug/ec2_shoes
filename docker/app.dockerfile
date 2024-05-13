FROM node:19-alpine3.16

WORKDIR /var/www/html/fe

RUN chmod -R 700 .

COPY . .

CMD [ -d "node_modules" ] && npm run serve || npm ci && npm run serve
