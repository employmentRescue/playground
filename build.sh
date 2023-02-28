#! /bin/sh
set -e

cd react-framework
npm i; npm run build; cp firebase-messaging-sw.js dist/; sudo docker build --no-cache -t itmagician/ssafy-b309:react-framework .; sudo docker push itmagician/ssafy-b309:react-framework;

cd ../spring-framework

cd api-gateway
echo "API GATEWAY BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:api-gateway-service .; sudo docker push itmagician/ssafy-b309:api-gateway-service;

cd ..

cd chat-service
echo "CHAT Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:chat-service .; sudo docker push itmagician/ssafy-b309:chat-service;

cd ..

cd matching-service
echo "matching Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:matching-service .; sudo docker push itmagician/ssafy-b309:matching-service;

cd ..

cd notify-service
echo "notify Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:notify-service .; sudo docker push itmagician/ssafy-b309:notify-service;

cd ..

cd oauth-service
echo "oauth Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:oauth2-service .; sudo docker push itmagician/ssafy-b309:oauth2-service;

cd ..

cd team-matching-service
echo "team-matching Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:team_matching-service .; sudo docker push itmagician/ssafy-b309:team_matching-service;

cd ..

cd user-service
echo "user Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t itmagician/ssafy-b309:user-service .; sudo docker push itmagician/ssafy-b309:user-service;

cd ../..
