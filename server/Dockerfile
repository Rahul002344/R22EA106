FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install
COPY src ./src
EXPOSE 5000
CMD ["npm","start"]
