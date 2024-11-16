# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the project files
COPY project .

# Install dependencies
RUN npm ci

# Set the PATH environment variable to include the Next.js binary
ENV PATH="/app/node_modules/.bin:${PATH}"

# Start the NextJS application in development mode
CMD ["npm", "run", "dev"]
