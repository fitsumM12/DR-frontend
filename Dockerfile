# Official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["serve", "-s", "build", "-l", "3000"]
