FROM openjdk:17-alpine
WORKDIR /usr/src/app


# 외부에서 해주어야하는 작업 (gradle dependecy 재설치 안하려고 함)
# RUN chmod +x gradlew 
# RUN sudo ./gradlew clean bootJar -x test 

ARG JAR_FILE=./build/libs/*-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
CMD ["java","-jar","app.jar"]

