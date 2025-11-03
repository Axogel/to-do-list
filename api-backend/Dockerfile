# Etapa única de ejecución
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

RUN npm install -g nodemon

COPY . .


EXPOSE 3000

CMD sh -c "npx sequelize-cli db:migrate && npm start"
