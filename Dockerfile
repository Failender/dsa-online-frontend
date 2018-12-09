FROM node:9.11-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm set loglevel warn --global
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build
RUN mv /usr/src/app/dist/assets/ /usr/src/app/dist/asset
RUN mkdir /usr/src/app/dist/assets/
RUN mv /usr/src/app/dist/asset/ /usr/src/app/dist/assets/assets

FROM nginx:1.13-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/dist/* /usr/share/nginx/html/
