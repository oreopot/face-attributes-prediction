# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:13.14 as build
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json .

## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install
# Copy the contents of the project to the image
COPY . .
ENTRYPOINT [ "npm" ]
# Run 'npm start' when the container starts.
CMD ["run test"]