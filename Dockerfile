FROM node:18.11.0
WORKDIR /usr/src/app
ENV DB_HOST="db"
ENV DB_PORT=3306
ENV DB_USER=""
ENV DB_PASS=""
ENV DB_NAME="efreicraft"
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
