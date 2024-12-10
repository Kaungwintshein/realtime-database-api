# Use the official Node.js image.
FROM node:20.9.0

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate dev
# Copy app source code.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Run the app.
CMD ["npm", "start"]