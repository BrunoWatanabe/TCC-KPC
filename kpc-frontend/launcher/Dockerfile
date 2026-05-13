FROM node:20-slim

ENV NODE_ENV=development
ENV CI=1
ENV BROWSER=none

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY index.html index.mvvm.html tsconfig.json tsconfig.node.json vite.config.js vite.mvvm.config.js openapi.json ./
COPY .storybook ./.storybook
COPY src-mvvm ./src-mvvm
COPY estilo_story ./estilo_story

EXPOSE 5174

CMD ["npm", "run", "dev:mvvm", "--", "--host", "0.0.0.0", "--port", "5174", "--strictPort"]