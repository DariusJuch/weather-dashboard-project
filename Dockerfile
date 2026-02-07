FROM node:18-slim
WORKDIR /app
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN cd backend && npm install
RUN cd frontend && npm install
COPY . .
RUN cd frontend && npm run build
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD ["node", "backend/server.js"]
