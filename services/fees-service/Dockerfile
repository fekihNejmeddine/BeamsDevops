# Use Node.js v20.16.0
FROM node:20.16.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the app port
EXPOSE 4003

# Start the app
CMD ["npm", "start"]
