docker kill api;
docker system prune -af --volumes;
docker-compose up --build -d;
