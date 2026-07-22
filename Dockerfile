# 1. Aşama: Build (İnşaat)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Production (Sunum)
FROM nginx:stable-alpine
# Build klasörünü Nginx'in yayın klasörüne kopyala
# NOT: Eğer Vite kullanıyorsan '/app/build' yerine '/app/dist' yazmalısın!
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]