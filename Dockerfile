#Step 1 - Build library
FROM node:10.14.1-alpine
RUN mkdir -p /usr/src/app/library
WORKDIR /usr/src/app/library
COPY library/package.json /usr/src/app/library
RUN npm set loglevel warn --global
RUN npm install --silent
COPY ./library /usr/src/app/library
RUN npm run build
WORKDIR /usr/src/app/library/dist/dsa-components
RUN npm link

#Step 2 - Build App using the build library as link
RUN mkdir -p /usr/src/app/app/
WORKDIR /usr/src/app/app
COPY app/package.json /usr/src/app/app
RUN npm set loglevel warn --global
RUN npm install --silent
RUN npm link dsa-components
COPY . /usr/src/app
RUN npm run build
RUN mv /usr/src/app/dist/assets/ /usr/src/app/dist/asset
RUN mkdir /usr/src/app/dist/assets/
RUN mv /usr/src/app/dist/asset/ /usr/src/app/dist/assets/assets

FROM nginx:1.13-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/app/dist/* /usr/share/nginx/html/
