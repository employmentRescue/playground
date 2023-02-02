FROM node:18.12.1-alpine

WORKDIR /app 

COPY package*.json ./ 

# RUN npm update
RUN npm update
RUN npm install  

# VOLUME ["/home/pi/dock/npm-1"]
expose 8080

#RUN npm start
