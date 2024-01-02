# Base image
FROM ubuntu:20.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Update and install basic packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
    nodejs \
    npm \
    mysql-server \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Expose necessary ports (MySQL: 3306, ...)
EXPOSE 3306

# Place scripts
COPY ./init/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
COPY ./init/init-db.sql /usr/local/bin/init-db.sql

# Run scripts
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Prevent container from shutting down after scripts
CMD [ "sleep", "infinity" ]
