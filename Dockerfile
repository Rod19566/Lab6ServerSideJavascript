FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

ENV MYSQL_DATABASE=blog_db1
ENV MYSQL_USER=blog_user1
ENV MYSQL_PASSWORD=blog_password1
ENV MYSQL_ROOT_PASSWORD=root_password1

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]