FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiar prisma antes de generar cliente
COPY prisma ./prisma
RUN npx prisma generate

# Copiar el resto del código
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
