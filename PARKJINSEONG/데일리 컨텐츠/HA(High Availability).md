# HA(High Availability)

## 고가용성

- 서버와 네트워크, 프로그램 등의 정보 시스템이 오랜 기간 동안 지속적으로 정상 운영이 가능한 성질
  ⇒
  시스템에서 이슈 발생 시 , 얼마나 빠른 시간 내에 복구가 가능한지에 대한 척도
- 아키텍처를 어떻게 효율적으로 설계할 것인가

## 관련, 용어 정리

- Active
- Standy
- Master
- Slave
- Backup

## Active / Standby

- active : client로부터 request를 받아서 처리하는 역할
- standby : 예측한 이벤트(장애 등)가 발생했을 때, Active 대신 request를 처리하는 역할
- 장점 : 최소한의 시간으로 장애 복구 가능

## Master / Slave / Backup

- master : 하나의 역할을 수행 하는데 있어 동작의 주체가 되는 역할을 수행
- Slave : 주로 마스터의 지시에 따라, 종속적인 역할을 수행 ( 보통 트래픽이 많이 발생하는 작업을 가지고 감 → 스케일링이 가능함 )
- Backup : 특정 서버의 역할을 대체하기 위해, 준비된 서버

## Cache server의 이중화 구성

- Cache server의 다운 발생 시, 대체할 수 있는 미러링 서버를 구성
- Active / Standby 와 Master / Backup 구성

## MySQL에서 Replication 구성

- Master와 Slave는 dedicated storage 사용하여 async 방식으로 데이터 복제
- Master에서 CRUD의 CUD를 담당하고, Slave에서 R을 담당
- Slave 서버는 Scale-out이 쉽게 가능 (1:N)
- Active / Active 와 Master / Slave 구성

## Load Balancer 아래에 n개의 server 구성

- 부하분산이 목적
- n개의 Active Server로 구성
- 모든 Server가 Active
- Active / Active 구성
- 장점 : 장애 리스크 햇지 및 분산

## VRRP 구성

- 등등..
