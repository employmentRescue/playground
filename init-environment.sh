#! /bin/sh
set -e

# CERTBOT
echo "installing 'CERTBOT'"
sudo snap install core; sudo snap refresh core;sudo snap install --classic certbot; sudo ln -s /snap/bin/certbot /usr/bin/certbot;

# DOCKER
echo "installing 'DOCKER'"
sudo apt-get update -y

sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo docker run hello-world

docker run --name redis -d -p 6379:6379 redis
docker run --name service-registry -d -p 8761:8761 itmagician/ssafy-b309:service-registry

echo "installing 'docker-compose'"
sudo apt install -y docker-compose

# 빌드 환경은 수동으로 설치해. (npm 18.x와 openjdk-17-jdk 패키지 설치, JAVA_HOME 설정)