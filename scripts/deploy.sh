docker kill api;
docker-compose up -f /home/fivenemos/nemo-express/docker-copose.yml --build -d;
docker system prune -af --volumes;