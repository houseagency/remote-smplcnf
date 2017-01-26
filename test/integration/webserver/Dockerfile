FROM nginx
COPY public /usr/share/nginx/html
RUN apt-get update -y
RUN apt-get install --no-install-recommends --no-install-suggests -y curl
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
