# 실행하기 전에 먼저 선행되어야하는 작업.

1. mysql(port : 3333), redis(port : 6379), eureka-server(serivce-registry)가 켜져있어야함.
2. docker로 eureka 켜기 : 'sudo docker run -d -it -p 8761:8761 --name service-registry itmagician/ssafy-b309:service-registry'

# 도메인 변경시 소스코드를 변경해야하는 곳
1. oauth service  
   가. application.yml : oauth2.api_gateway_url