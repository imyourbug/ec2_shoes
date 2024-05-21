# cd /var/www/html/be && docker compose up --build -d
cd /var/www/html/fe && docker compose down
cd /var/www/html/fe && docker compose up --build -d
