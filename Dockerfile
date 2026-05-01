# ===== Stage 1: Build =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --configuration=production

# ===== Stage 2: Nginx =====
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/techmarket-web/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]