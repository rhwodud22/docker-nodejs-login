# Use the official image as a parent image.
FROM node:current-slim
# version

# Set the working directory.
WORKDIR /app

# Copy the file from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD [ "npm", "start" ]