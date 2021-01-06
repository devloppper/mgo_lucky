FROM node:10-alpine

MAINTAINER JayHoo <jayhoozone@163.com>

ENV RUN_ENV=local


COPY ./app      /data/app/
COPY ./config   /data/config/
COPY ./static   /data/static/
COPY ./package.json /data/package.json

RUN cd /data/
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

WORKDIR /data/

RUN mkdir -p /data/logs/ \
RUN echo "Asia/Shanghai" > /etc/timezone
RUN /bin/ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

CMD export NODE_ENV=${RUN_ENV} EGG_SERVER_ENV=${RUN_ENV} && npm run docker_start

