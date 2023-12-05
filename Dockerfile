# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN  apk update && \
     apk add python3 make g++ && \
    npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run your application
CMD ["node", "app.js"]

#docker build -t my-express-app .

#docker run -p 3000:3000 -d my-express-app

