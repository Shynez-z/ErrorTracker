# ===============================
# Builder Stage (Backend + Frontend)
# ===============================

FROM node:20-alpine AS builder

WORKDIR /app

# ---------- Backend Build ----------
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend
RUN cd backend && npm run build

# ---------- Frontend Build ----------
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build -- --configuration production


# ===============================
# Runtime Stage
# ===============================

FROM node:20-alpine

WORKDIR /app

# Copy backend compiled code
COPY --from=builder /app/backend/dist ./dist

# Copy backend package.json for runtime deps
COPY --from=builder /app/backend/package*.json ./

RUN npm install --production

# Copy Angular production build
COPY --from=builder /app/backend/public ./public

# ===============================
# Environment + Runtime
# ===============================

EXPOSE 8080

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]