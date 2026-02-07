FROM node:18-slim
WORKDIR /app
COPY . .
RUN npm install
RUN cd frontend && npm install && npm run build
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD ["node", "backend/server.js"]
