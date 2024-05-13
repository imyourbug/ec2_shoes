FROM node:19-alpine3.16

WORKDIR /var/www/html/fe

COPY . .

CMD [ -d "node_modules" ] && npm run serve || npm ci && npm run serve
