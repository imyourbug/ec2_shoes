FROM node:19-alpine3.16

# Set the working directory
WORKDIR /var/www/html/fe

# Copy the rest of the project files
COPY fe/package.json .

COPY fe/* .

RUN npm install

# Expose port 8080 (informs Docker the container listens on this port)
EXPOSE 8080

# Start the development server
CMD [ "npm", "run", "serve" ]
