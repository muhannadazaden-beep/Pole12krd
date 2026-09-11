FROM node:22-alpine
WORKDIR /app
COPY backend/package.json ./package.json
RUN npm install --omit=dev
COPY backend ./backend
COPY public ./public
ENV NODE_ENV=production
EXPOSE 10000
CMD ["node","backend/server.mjs"]