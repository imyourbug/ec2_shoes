FROM nginx:stable-alpine

ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./docker/laravel.nginx.conf /etc/nginx/conf.d/laravel.nginx.conf
ADD ./docker/vuejs.nginx.conf /etc/nginx/conf.d/vuejs.nginx.conf
