cd react
docker build -t petrosan/doodle_frontend:latest --build-arg VITE_BACKEND_URL=https://petros-an.com:8000 --no-cache .

cd ..

cd doodle_server
docker build -t petrosan/doodle_backend:latest .

docker push petrosan/doodle_frontend:latest
docker push petrosan/doodle_backend:latest

cd ..

ssh petros@"$deploy_host" "cd doodle; docker compose pull backend frontend; docker compose up -d"

