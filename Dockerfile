# ---------- Stage 1: Build Backend ----------
FROM node:20-alpine AS backend-builder

WORKDIR /ERRORTRACKER/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

RUN npm run build

# ---------- Stage 2: Build Frontend ----------
FROM node:20-alpine AS frontend-builder

WORKDIR /ERRORTRACKER/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build -- --configuration production

# ---------- Final Runtime Image ----------
FROM node:20-alpine

WORKDIR /app

# Copy backend compiled code
COPY --from=backend-builder /ERRORTRACKER/backend/dist ./backend/dist
COPY --from=backend-builder /ERRORTRACKER/backend/package*.json ./backend/

WORKDIR /app/backend
RUN npm install --production

# Copy Angular build
COPY --from=frontend-builder /ERRORTRACKER/frontend/dist ./public

EXPOSE 8080

CMD ["node", "dist/server.js"]