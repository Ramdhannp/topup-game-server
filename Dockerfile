bashCopy code
# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application files into the working directory
COPY . /app

expose 4000

# Define the entry point for the container
CMD ["npm", "start"]