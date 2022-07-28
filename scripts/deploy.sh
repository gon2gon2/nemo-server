docker kill api;
docker system prune -af --volumes;
docker-compose -f /home/fivenemos/nemo-express/docker-compose.yml up --build -d;
