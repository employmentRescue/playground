# 소셜 운동 매칭 서비스 PLAYGROUND

![PLAYGROUND_로고](https://user-images.githubusercontent.com/67595512/216354195-c1b5a322-c60b-47a1-b585-d73594f8a50a.jpg)

<br>
<br>
<br>

# 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [프로젝트 설계](#2-프로젝트-설계)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [프로젝트 기술](#4-프로젝트-기술)
5. [진행 상황](#5-진행-상황)

<br>
<br>
<br>

# 1. 프로젝트 소개

## 🔎 기획 배경

위드(with) 코로나로 밖에 나와 사람들과 같이 운동을 하고 싶어하는 사람들이 늘고 있다. 또한 풋살의 인기로 동호회들이 꾸려지는 추세이다. 하지만 마땅한 운동 전문 플랫폼이 존재하지 않는다.
<br>
<br>
기존의 소셜 모임 플랫폼이나 운동 모임 플랫폼에서 불편한 점을 찾을 수 있었다. 

1. 원하는 조건의 운동 모임을 찾기가 어렵다. 
2. 지금 당장 사람을 구하기도 어렵다. 
3. 지속적인 참여와 소통을 위한 기능이 부재하다. 
4. 비슷한 수준의 팀을 찾기가 어렵다.

소셜 운동 매칭 서비스 'PLAYGROUND'는 기존 모임 서비스의 불편함을 해결하기 위해 개발되었다.

<br>
<br>
<br>

## 🏀 주요 기능

- ### 1. 실시간 지도
  
  - 공원마다 현재 인원이 어떤 운동으로 몇명 등록되어 있는지 확인할 수 있어요.
  - 농구, 축구, 배드민턴 중 내가 하고 싶은 운동에 사람이 부족할 때 지도에 표시를 남겨 인원을 모집할 수 있어요.

- ### 2. 운동 모임 탐색
  
  - 
  - <br>

- ### 3. 개인 매칭
  
  - 원하는 거리, 시간 등을 설정하고 버튼 한번으로 간편하게 같이 운동할 사람을 모집할 수 있어요.
  - 직접 운동 인원을 모집하는 게시글을 올려 같이 운동할 사람의 참여를 유도할 수 있어요.

- ### 4. 팀 매칭 & 랭킹
  
  - 내 팀과 수준이 비슷한 팀을 찾아서 매칭시켜줘요.
  - 내 팀이 얼마나 잘하는지 알고 싶지 않나요? 팀 랭킹을 통해 우리 팀의 순위를 알 수 있어요.

- ### 5. 실시간 채팅 & 알림
  
  - 사용자가 직접 초대하는 대신 매칭된 인원, 참여한 팀에 대해 자동으로 채팅방을 생성해줘요.
  - 채팅방 생성, 매칭 완료 등 중요한 알림을 표시해줘요.

<br>
<br>
<br>

# 2. 프로젝트 설계

- ### 회의록 [Notion link](https://robust-sailfish-09f.notion.site/3db2ad371a2c4f26adf864f4ed18a370?v=568f14f9a2f54768b22f32388d8610c3)

- ### 초기 기획서 [Notion link](https://www.notion.so/b35493c281da4c27aed52d064d5f6605)

- ### 와이어프레임 & 스토리보드 [figma link](https://www.figma.com/file/YlOB3Ah579DUXWWMRReYjI/Team-project1?node-id=0%3A1&t=GafPuwx93aH6e3QT-0)

- ### 기능명세서 [Notion link](https://sparkly-condition-4b3.notion.site/75a8fd7421be41dda09b7c1927d26d3e?v=a84d49ac8707462e8181598f300b88a8)

- ### API 명세서 [Notion link](https://sparkly-condition-4b3.notion.site/96b451020ce54da5b859c9a659e4501b?v=4d6c3993eb574431b168ed3a2fca8ae8)

- ### ERD
  
  ![erd](https://user-images.githubusercontent.com/67595512/216329451-6e01ed21-1fb9-47dd-8073-89ddb471ee33.png)

- ### 시스템 아키텍쳐
  
  ![msa 아키텍처 발표용 (1)](https://user-images.githubusercontent.com/67595512/216329664-eee9a731-58b8-438b-9e2b-28ff0738c967.jpg)

<br>
<br>
<br>

# 3. 프로젝트 구조

## 🛠 기술 스택

### IDE

- Visual Studio Code
- IntelliJ

### Frontend

- React
- Redux
- Tailwind
- Typescript

### Backend

- Springboot
- Spring Data JPA
- Spring Web
- Spring Cloud
- WebSocket
- Redis
- MySql
- Swagger
- Firebase

<br>
<br>
<br>

## 📂 파일 구조

### Front

```
playground
  ├── public
  └── src
      ├── assets
      |   └── icons
      ├── components
      │   ├── DefaultLayout
      │   ├── LiveModel
      │   ├── Meeting
      │   └── uerserRegister
      |
      ├── hooks
      |   ├── useLiveMatchJoin.ts
      |   └── useLiveMatchListQuery,ts
      ├── models
      |   └── liveMatch.ts  
      └── pages
      |   ├── home
      |   ├── match
      |   └── user
      └── stores
          ├── home
          ├── match
          └── user
```

### Back

```
playground
  |
  ├── config
  ├── controller
  ├── dto
  ├── repository
  ├── service
  └── utils
```

<br>
<br>
<br>

# 4. 프로젝트 기술

<br>
<br>
<br>

# 5. 진행 상황

## 협업툴

- Notion
- MatterMost
- Figma
- Gitlab
- Jira
- Discode

<br>
<br>
<br>

## 역할 분담

### Frontend

- 박진성
- 이강윤
- 이경택

### Backend

- 유도열(팀장)
- 김아린
- 김태훈

<br>
<br>
<br>

## 개발 일정

### 기획/설계 :

### 개발 :

<br>
<br>
<br>

### 중간 결과
