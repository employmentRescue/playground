#! /bin/sh

cd react-framework
npm i; npm run build; cp firebase-messaging-sw.js dist/;sudo docker build --no-cache -t react-framework .

cd ../spring-framework

cd api-gateway
echo "API GATEWAY BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t api-gateway-service:latest .;

cd ..

cd chat-service
echo "CHAT Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t chat-service:latest .;

cd ..

cd matching
echo "matching Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t matching-service:latest .;

cd ..

cd notify-service
echo "notify Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t notify-service:latest .;

cd ..

cd oauth_service
echo "oauth Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t oauth2-service:latest .;

cd ..

cd team-matching
echo "team-matching Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t team_matching-service:latest .;

cd ..

cd user-service
echo "user Service BUILD"
chmod +x gradlew
./gradlew clean bootJar; sudo docker build --no-cache -t user-service:latest .

cd ../..
