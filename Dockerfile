FROM node:latest
# copy source code to container
RUN mkdir /app
WORKDIR /app
COPY ./server /app
COPY ./frontend /app/static
RUN chmod -R 777 /app/static
# get dependencies
RUN npm install
# run the app 
CMD [ "/bin/bash","./starter.sh" ]