FROM node:14

WORKDIR /var/www/click-house-buffer

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]