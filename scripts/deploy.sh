docker kill api;
docker system prune -af --volumes;
docker pull gcr.io/red-seeker-356107/api;
docker run -p 3000:3000\
    -v ./uploads:/nemo/uploads
    -e NODE_ENV=production\
    --env-file ./config/.env\
    --name=api\
    -d gcr.io/red-seeker-356107/api\
    ;