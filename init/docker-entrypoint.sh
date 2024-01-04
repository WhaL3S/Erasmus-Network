#!/bin/sh

echo "Starting MySQL..."
mysqld_safe &

echo "MySQL started, waiting for it to become ready..."
while ! mysqladmin ping -h localhost --silent; do
    sleep 1s
done

echo "MySQL is ready. Executing the initial DB script..."
mysql < /usr/local/bin/init-db.sql

MYSQL_COMMAND="ALTER USER 'root'@'localhost' IDENTIFIED BY '';"
echo $MYSQL_COMMAND | mysql -u root -p

echo "Initial DB script executed. Proceeding with other commands."

exec "$@"
