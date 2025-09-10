cd react
docker build -t petrosan/doodle_frontend:latest --build-arg VITE_BACKEND_URL=http://172.236.13.62:8000 --no-cache .

cd ..

cd doodle_server
docker build -t petrosan/doodle_backend:latest .

docker push petrosan/doodle_frontend:latest
docker push petrosan/doodle_backend:latest

cd ..

ssh "$deploy_host" "cd doodle; docker compose up -d --pull always"

