# Build stage
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Runtime stage
FROM nginx:1.27
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
