FROM node:8.4.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm set loglevel warn --global
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build

FROM nginx:1.13-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/dist/* /usr/share/nginx/html/