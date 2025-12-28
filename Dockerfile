# Multi-stage Dockerfile

# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# Install deps (use ci for reproducible builds)
RUN npm ci --silent
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: include a simple health endpoint or custom nginx conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
