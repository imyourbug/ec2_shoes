FROM node:19.5.0-alpine

# RUN npm install -g http-server

WORKDIR /app

COPY ./package*.json .

# ENV GENERATE_SOURCEMAP false
RUN npm install -g @vue/cli
# RUN node --max-old-space-size=18000 `which npm` install
RUN npm install

COPY . .
# 

# RUN node --max_old_space_size=18000 `which npm` run build

# RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
# CMD [ "http-server", "dist" ]