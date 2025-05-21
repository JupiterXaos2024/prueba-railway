# Dockerfile
FROM node:18-bullseye

# Instala dependencias de Chromium
RUN apt-get update \
 && apt-get install -y \
    chromium \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libasound2 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Apunta puppeteer-core al Chromium del sistema
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["node", "index.js"]
