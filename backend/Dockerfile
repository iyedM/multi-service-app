# Use Node.js 20 alpine as base
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# --- Runtime Stage ---
FROM node:20-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Use non-root user
USER appuser

EXPOSE 5000

CMD ["npm", "start"]
