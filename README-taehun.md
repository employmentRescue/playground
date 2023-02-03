# Webflux 그리고 Netty. 비동기 웹 서버
: 스프링 부트 3.0부터는 Webmvc를 사용하지 않고, webflux로 변경됨.  

https://www.baeldung.com/spring-webflux

# springdoc-openapi-starter-webmvc-ui version 2.0.0
: 스프링 부트 3.x이상은 swagger가 안 먹히는데, 대신 위의 dependency와 Spring boot의 application 클래스(main 메소드 있는 곳)에 @EnableWebMvc를 해주면 swagger가 뜸.  

단, 주의할점이 있다. 스프링 부트 3.x 이상에서 @EnableWebMvc를 쓰면, redirect가 제대로 안되는 현상이 있다.  
  
# Webflux filter.
WebMvc의 필터는 filter adapter를 implementation받아서 사용을 했다.  
하지만 Webflux는 2가지 방법이 있다.  
첫번째는 모든 endpoint에 작동하는 Webfilter와 특정 endpoint에 작동하는 HandlerFilterFunction가 있다.  
  
+ api. 게이트웨이를 커스텀할 필요가 있어서 조사해보다가 AbstractGatewayFilterFactory라는 것과
Spring 3.x부터는 GatewayFilter에 ______GatewayFilter라고 이름을 짓는것을 권장한다는것을 알았다.

# 로드밸런서가 클러스터 채팅 서버에서 TCP 소켓을 어떻게 유지하게 할 수 있을까?
- 정답 : tcp src의 ip와 port번호를 기억하면 된다. ip도 고유 id이고, tcp 소켓에서 포트번호는 공유할 수 없기에 얘도 고유 id이기 때문이다.
우리 프로젝트는 시간적 여유가 가능하면 오토 스케일링까지 계획을 했다.  
하지만 놓친 테스트케이스가 Load Balancer가 무작위로 Http Request를 서버에 분배한다면, a랑 커넥션을 맺은 A한테 가야하는데 A가 없는 서버로 분배가 된는 점이다.
그래서 websocket의 end point를 '/websocket/**'으로 정의해서 url 필터링한후에 처리하는 방식을 선택했다.
(실험은 안 해봤는데, 만약 내가 spring session disable 설정하면 안되것지? ㅋㅋㅋ)

# spring security oauth client2는 세션 기반으로 동작한다.
1학기때 jwt를 사용하게 되면서 sessionless라는 단어를 습득했다. 그리고 자연스럽게 spring 서버에서 세션을 사용하지 못하게 설정하는 법을 배웠는데, oauth 인증때 적용했다가 white label을 만났다. 그래서 한동안 고생했다.

# oauth는 다른 사이트(네이버, 카카오 등)의 서비스를 사용하기 위한 인가작업을 얻는 과정이다.
예를 들면 oauth로 토큰을 받아오면, 해당 사용자 이름으로 카카오톡 메서지를 보낼수있다.
그래서 사람들이 카톡 access_token을 쓰는것을 못봤던 것이다. 처음 접했을 때는 access_token을 발급받았는데, 또다시 access_token을 발급받는지 이해가 안갔다. 그런데 만약 내 카톡 access_token이 탈취를 당했다면? 생판 모르는 사람에게 광고 메세지를 보내는 일이 발생할거다. 어우... 생각만 해도 끔찍하다.

# In-memory
MSA 아키텍처를 조사하면서, In-memory라는 용어를 가끔씩 봤는데 이해가 안 된적이 있다. 그런데 '박찬국 컨설턴트'님으로부터 in-memory를 듣자마자 이해가 되었다.  
In-memory는 DB를 사용하지 않고 RAM에만 데이터를 저장하는 것이라고 생각하면 될 것 같다.  


# Netflix gateway는 실제로 넷플릭스에서 사용되는 api gateway를 중국 개발자가 spring으로 만든 것이다. Load balancer 역할을 하는 ribbon 등과 함께 쓸수있고, 수동으로 round robin 등 로드밸런싱 로직을 설정할 수 있다.

# circuit breaker. 그리고 hystrix
Hystrix는 msa 아키텍처에서 회로 차단기(맞다, 당신이 생각하는 과전류, 전압 차단기) 역할을 한다. 뭘 차단할까? 장애 전파를 차단한다.
A,B,C,D 서비스가 하나의 트랜잭션일때 각 서비스는 순서대로 동작한다. 이때 B가 고장나서 비정상적인 응답이 어떤 특정한 방식(예를 들면 kafka에 의해 장애 발생 - 상상이 잘 안가지만 실제로 가능한 경우가 있다고 함.)으로 전달된다고 하면, B의 순서 뒤에 있는 서비스들도 invalid_error나 internal_server_error를 내 뿜을거다.
만약 B의 순서 뒤에 있는 서비스가 50개, 100개 등 더 많다면? B때문에 나머지 서비스도 고장(버그)가 있는것처럼 보일거다. 이걸 막아주는게 CIRCUIT BREAKER이다.


# Spring Cloud Eureka  
스프링 기반 Service Registry이다.  

# Software Load Balancer  
- Ribbon
- K8S(얘는 다 한다. 얘 뭐니!! Auto Scale도 하고, 이것 저것 다하는데.. ㅋㅋㅋㅋㅋㅋㅋㅋ 미*놈이다.)
- zookeeper(얘는 Kafka랑 연관이 있다. 리눅스에서 얘를 설치안하면, kafka도 못 설치한다. 아마 kafka가 zookeeper를 사용하는 듯 하다.)

# DB 트랜잭션? 아니죠! MSA 트랜잭션입니다만!! : SAGA 패턴
하나의 동작(예를 들면 OAUTH 인증 후에 User 등록, OAUTH 서비스 서버 -- (사용자 등록 요청) --> User 서비스 서버)이 MSA로 되면, @Transactional 사용이 안된다는 것을 알고 있을 것이다. 왜냐하면 a,b,c 서비스에서 한 서비스가 고장나면, 나머지 서비스에게 이를 알려서 롤백되어야하는데 알릴 방도가 없기 때문이다. SAGA 패턴은 Kafka, RabbitMQ 등을 사용해서 트랜잭션을 처리하는 방법을 담고 있다.  

# QueryDSL. Jpa랑 역할이 같은 dependency이다.
Jpa가 쿼리를 string으로 날려야한다면, queryDSL은 코드 기반으로도 동작할수있다.
예를 들면 queryFactory.select(qMember.name, qDepartment.employ_number).from(qMember).join(qDepartmebr).where(...)나 update(qMember).set(qMember.salary, 999,999,999).set(qMember.depName,"회계").where(...)으로 사용할 수 있다.
또한 Builder 패턴이기 때문에 update 쿼리의 set을 여러개 사용할 수 있는 장점이 있다.
구현을 편리하게 만들어주는 아이이지만, 얘가 더 발전할 때까지는 다시 만나고 싶지는 않다.  
왜냐하면 dependecy 설정에 많은 시간투자를 해야하는 것과, Entity클래스 내용이 변경되면 build라는 폴더에 Q 클래스를 실행 혹은 배포할 때마다 새로 생성을 해야한다.  그게 여간 성가시더라.. 
  
+  QueryDSL 예전버전은 연관관계를 정의해주어야만, 조인을 할 수 있었다고 한다.(이 점을 알면 덜 고생한다.)  
처음 JPA를 사용했을 때 Hibernate가 내뿜는 에러한테 많이 혼났었는데, 그 중에 연관관계를 전혀 모른 상태로 사용했을때다. 근데 운좋게 태어난 나는 연관관계에 대해 나중에 공부하고 일단 코드 기반 SQL 작성으로 문제를 해결하여, 1인분이라도 할 수 있었다..(나.. 너무 많이 저지른것같다.. 앱 개발.. ci/cd.. 아키텍처 fcm... 허헣... 적당히 해야 하루하루가 심리적 압박이 덜 할텐데.. 기술을 습득하고 싶은 욕심, 잘 하고 싶고 취업에 잘 쓰여서 높은 점수를 받고 싶은 거, 팀원으로써 기여하고 싶은 거.. 여러가지때문에 저질렇다.... 그렇다..)

# 빌더 패턴
빌더 패턴은 java 클래스의 생성자 사용과 관련이 깊다.
lombok으로 '@AllArgsConstructor'만 선언한 클래스를 사용할 때, (a,b,c,null,null,null,null,...)을 사용한 적이 있다.
이때 필요없는 부분은 null을 안 쓰는 방법이 없을까라고 생각한 것을 해결해주는게 builder 패턴이다.  
builder 패턴의 구현은 단순하다. setter라는 함수를 사용하고 나서, 'return this'라는 객체 주소를 던져주면 필드 순서에 상관하지 않고 또다시 수정 혹은 값 설정을 할 수 있다.
--> AA a = "A.builder().setDonner('도넛은 맛있었나').setBurgurking('아 버거킹 먹고 싶다').set현다이('현차 날 뽑아줘잉~~').build()"

# docker-compose.
도커 컴포즈는 여러개의 컨테이너를 하나로 관리하는 툴이다. 
얘를 사용하게 되면 여러개의 네트워크를 하나로 묶어서 관리할 수 있기도 하고, 별도의 스크립트 없이 .yml 파일 하나만으로도 도커 이미지를 생성할 수 있다.
단, 주의할 것은 현업에서는 .yml 파일 하나만으로 도커 이미지를 생성하지 않는다.(https://learn.microsoft.com/ko-kr/azure/cognitive-services/containers/docker-compose-recipe)  각 서비스마다 별도의 도커 이미지를 생성하는 스크립트를 작성하는 방식을 사용함.  
왜 그럴까?라고 최근까지 그런 생각을 했지만, 오늘 직접 구축을 해보면서 스크립트는 각 서비스를 개발하는 사람들이 별도로 작성하는 것이 맞다고 생각을 했다.  개발자마다 사용하는 dependecy가 다르고, 심지어 포트번호 등 여러가지 설정도 다르게 할 가능성이 있다. 만약 이 상황이라면, 난 docker compose 스크립트를 작성할 때마다 팀원에게 mattermost dm으로 '프로젝트 관련 설정'에 대해 자세히 물어봐야한다.  
내가 느끼는 협업 툴은 swagger처럼 누군가에게 직접 물어보지 않아도 작업을 가능하게 해주는 것인데, 이건 협업 툴이 나오게 된 목적을 무시하는 거라고 생각된다. 그래서 docker compose의 중앙 관리 방식을 사용하지 않는 것이다.  

# FCM
fcm은 '클라우드 메세지'라고 하는 SaaS이다. 내가 Firebase라는 클라우드 서버에 title, body(message)를 보내면, 클라우드는 request에 포함된 token을 읽는다. 그 다음에 그 token에 해당하는 사용자 기기에 메세지를 보낸다.  
FCM이 WebSocket보다 나은 점은 전력관리에 유리하다는 점이라고 한다.(https://firebase.google.com/products/cloud-messaging?hl=ko)

# Hybrid Application  
하이브리드 애플리케이션은 스마트폰 앱을 말한다. 단, 일반 앱과 다른 점은 웹 페이지를 사용해서 UI를 제공한다.  
대표적인 예가 유튜브일것이다.   옛날만 해도 최신 유튜브 UI를 사용하고 싶으면, 앱 업데이트를 해야 사용이 가능했다. 하지만 지금은 그렇지 않은데, 유튜브 쇼츠가 바로 그 예이다.  예전에 나는 심적으로 힘들어다보니 모든게 다 성가시게 느껴져서, 앱 업데이트가 자동으로 되는 것이 싫어진적이 있다. UI가 바뀌면 또다시 적응을 하는데 에너지를 소모할 여유가 없었기 때문이다.  그래서 최대한 버티는 방향으로 삶을 살았는데, 어느새 유튜브가 Hybrid Application 방식을 적용해서 이 방법을 안통하게 만들었다.  
Flutter를 사용하여 앱에 브라우저를 내장시키면서, 그 고통스러운 안드로이드, IOS 개발을 덜 느껴도 UI 및 UI Interaction을 만들 수 있는 점이 좋았다.  (하지만.. Flutter를 쓴다고 해도 여전히 안드로이드, IOS에 대한 지식이 있어야하긴.. 하다.. 하핫.. 왜냐하면 manifest.xml 등을 다루는 부분이 필요하기 때문이다.)

# Jenkins
젠킨스를 한 단어로 표현하면, 리눅스 명령어 실행기이다.
얘는 CI/CD 툴이라고 불리지만, 사실 리눅스 명령어를 실행해서 .jar, .exe, .oob 등의 실행 파일을 만들 수 있기 때문에 그렇다.  
얘한테 'echo hi Bang & mkdir /home/pi/raspberry'이라고만 치면, 실제로 'hi bang'이라는 메세지랑 '/home/pi/raspberry' 디렉토리를 만들고 끝낸다.  
애한테 뚜가맞았던 여러가지 중에서 '왜 얘를 도커 컨테이너에 담는지'가 이해가 안되었다.  
'백문이불여일견'이라고 직접 구현을 해보니, 얘 자체를 MSA 아키텍처의 하나 서비스(애플리케이션)으로 생각할 수 있기 때문에 도커 컨테이너에 담기도 하는 것이었다.  
- SI 업체처럼 SW를 판매하는 경우, 초기 설정만 해놓으면 그 후에는 고객사에게 방문할 필요도 없을 것 같다.  
(내가 데이터센터에서 근무했을 때 누군가 Jenkins를 하나의 서비스에 같이 묶어버렸다면, NAC, 보안관리체계 등의 SW를 유지보수하는 사람들이 기밀장소에서 보안에 위반되는 일을 하는지 쭉 관찰하는 귀찮은 일이 없었것지라는.. 행복 회로가 돈다. ㅋㅋ)
+ pipeline은 여러개 job을 나누어서 관리를 할 수 있다. job은 stage('name')으로 이름을 정할 수 있으며, 하나의 job에서 5개 명령어를 적어놓았는데 3번째에서 실패한다면 그 job을 중단하고 dashboard에 실패라고 뜬다.  
그래서 pipeline을 사용하면, 'build' job, 'test' job, 'gitlab clone' job, 'curl' job 등으로 여러개를 나눌 수 있다.  
다만.. gradle 스크립트를 짜야한다.  
+ pipeline이 싫다면 'freestyle' 아이템을 생성해서 jenkins에게 리눅스 스크립트를 작성해줄수도 있다.
