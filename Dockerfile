FROM node:18

# Create app directory
WORKDIR /app/

RUN npm install -g yarn --force

COPY ./package.json ./
RUN yarn install

EXPOSE 80
EXPOSE 3005

COPY . .

CMD DEBUG=simple-chat:* PORT=80 node bin/www

