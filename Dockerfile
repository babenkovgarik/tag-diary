# --- Test Stage ---
FROM node:16 as test

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm test

# --- Production Stage ---
FROM node:16 as prod

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=test /app/dist /app/dist

EXPOSE 8080

CMD [ "node", "dist/server.js" ]
