FROM node:alpine

ENV PORT 3000

RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./ ./

ENV NODE_ENV production

RUN npm run build

CMD ["npm", "run", "start"]