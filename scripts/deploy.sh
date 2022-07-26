docker kill api;
docker system prune -af --volumes;
docker-compose up -f /home/fivenemos/nemo-express/docker-copose.yml --build -d;