docker-compose down;
docker system prune -af --volumes;
docker-compose up --build -d;
