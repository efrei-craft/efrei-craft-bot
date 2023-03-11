FROM node:18.11.0

WORKDIR /usr/src/app

ENV ANIMUS_BASE_URL=https://api.efreicraft.fr

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
