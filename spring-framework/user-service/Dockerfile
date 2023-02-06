FROM openjdk:17-alpine
WORKDIR /usr/src/app


# 외부에서 해주어야하는 작업 (gradle dependecy 재설치 안하려고 함)
# RUN chmod +x gradlew 
# RUN sudo ./gradlew clean build -x test 

ARG JAR_PATH=./build/libs
ARG JAR_FILE=$(echo ${JAR_PATH}/$(ls ${JAR_PATH}/*-SNAPSHOT.jar | head -1))
COPY ${JAR_FILE} ${JAR_FILE}
CMD ["java","-jar","${JAR_FILE}"]
