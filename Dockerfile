# ---------- Stage 1: Build Backend ----------
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

RUN npm run build

# ---------- Stage 2: Build Frontend ----------
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build -- --configuration production

# ---------- Final Runtime Image ----------
FROM node:20-alpine

WORKDIR /app

# Copy backend compiled code
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package*.json ./backend/

WORKDIR /app/backend
RUN npm install --production

# Copy Angular build
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 8080

CMD ["node", "dist/server.js"]