FROM node:18.11.0

WORKDIR /usr/src/app

ENV ANIMUS_BASE_URL=https://api.efreicraft.fr
ENV TOKEN=""
ENV APPID=""

COPY package.json ./
RUN npm install

RUN echo "10.10.51.120 api.efreicraft.fr" >> /etc/hosts

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
