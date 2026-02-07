FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd frontend && npm install && npm run build
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "backend/server.js"]
