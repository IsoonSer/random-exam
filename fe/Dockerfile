# Use an official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the React app will run on
EXPOSE 5173

# Start the development server (with hot-reloading)
# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev"]