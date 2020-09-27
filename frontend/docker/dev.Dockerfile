# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:13.14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]