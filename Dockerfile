# Use the official Node.js image.
FROM node:20.9.0

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy Prisma schema and other necessary files
COPY prisma ./prisma

# Set environment variable for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma client
RUN npx prisma generate

# Apply Prisma migrations
RUN npx prisma migrate dev --name init

# Copy app source code.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Run the app.
CMD ["npm", "start"]