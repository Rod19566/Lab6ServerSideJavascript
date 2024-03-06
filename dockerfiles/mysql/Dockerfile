# FROM ubuntu:latest
# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update && \
#     apt-get install -y mysql-server

# ENV MYSQL_DATABASE=dog_blog_db
# ENV MYSQL_USER=dog_blog_user
# ENV MYSQL_PASSWORD=dog_blog_password
# ENV MYSQL_ROOT_PASSWORD=root_dog_blog_password

# COPY schema.sql ./mysql/schema.sql
FROM mysql:8.3

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql