docker kill api;
docker system prune -af --volumes;
docker pull gcr.io/red-seeker-356107/api;
docker run -p 3000:3000\
    -v /home/fivenemos/nemo-express/uploads:/nemo/uploads\
    -e NODE_ENV=production\
    --env-file /home/fivenemos/nemo-express/config/.env\
    --name=api\
    gcr.io/red-seeker-356107/api\
    ;
