# base image
FROM node:alpine

# Install Python and build dependencies
RUN apk add --update --no-cache python3 make g++ \
    && ln -sf python3 /usr/bin/python

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install

# build the application
RUN npm run build

# expose the port the app runs on
EXPOSE 3000

# define the command to run the app
CMD ["npm", "run", "start"]
