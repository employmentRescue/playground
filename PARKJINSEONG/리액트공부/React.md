# React

# 1. 리액트 시작

## 1.1 왜 리액트인가?

- 현재 자바스크립트는 웹 애플리케이션에서 가장 핵심적인 역할을 함
- 이제 규모가 큰 어플리케이션도 자바스크립트로 만들 수 있음

#### 예시

- Electron(자바스크립트로 데스크톱 애플리케이션을 만들 수 있는 프레임워크) 
  -> Slack, Atom, VS Code 등

- Ionic, Titanium, NativeScript, React Native 등(자바스크립트로 크로스 플랫폼 애플리케이션을 개발할 수 있는 프레임워크)
  -> 페이스북, 디스코드, 페이팔, 이베이 등

#### 자바스크립트를 이용하는 프레임 워크들

- Angular

- Backbone.js

- Derby.js

- Ember.js

- Ext.js

- Knockback.js

- Sammy.js

- PureMVC

- Vue.js 

#### 주요 아키텍처

- MVC (Model-View-Controller)

- MVVM (Model-View-View Model)

- MVW (Model-View-Whatever)

#### 아키텍처 공통점

- Model : 어플리케이션에서 사용하는 데이터를 관리하는 영역

- View : 사용자에게 보이는 부분

#### 리액터 개발배경

- 보통 데이터에 수정이 있을 시 뷰를 변형하는데 규모가 커지면 복잡해짐

- 페이스북 개발 팀은 이를 해결하기 위해 기존 뷰를 날려 버리고 처음부터 새로 렌더링하는 방식을 고안

01/16

#### 컴포넌트

- **사용자 정의 태그**(<>)

- 가독성, 재사용성, 유지보수 ↑

# 리액트 시작해보기

#### 공식문서

- https://ko.reactjs.org/docs/getting-started.html

- codesandbox
  
  - 온라인 상에서 리액트 애플리케이션을 적용해볼 수 있음

- add React to and HTML in on minute

- toolchain
  
  - 유용한 기능들을 제공

- node.js 설치
  
  - cmd에서 설치 확인
    
    ```
    npm -v
    ```

- react 설치( 권한 에러인 경우 sudo를 붙임 )
  
  ```
  npm install -g create-react-app 
  sudo npm install -g create-react-app
  ```

- react 설치 확인
  
  ```
  create-react-app -V
  ```

- 공식 문서에서는 npm보단 npx를 권장
  
  - npx 는 임시로 설치 후 사용하고 지우는 프로그램이라고 이해
    
    - 최신 버전을 항시 사용가능
    
    - 리소스 사용이 적음

#### 리액트 환경설정

- cmd 창에서 cd (원하는 디렉토리를 드래그 앤 드롭)

- 해당 디렉토리에 react app create
  
  ```
  create-react-app .
  ```

#### 리액트 시작

- vs code 에서 ctrl + ` 로 terminal 창 열기
  
  ```
  npm (run) start
  ```

- 해당 메세지와 창이 뜸
  ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-16-20-13-24-image.png)

- 서버를 종료할 시 커맨드 창에 ctrl + c 

- public 디렉토리 안에 **index.html**
  
  - **root 태그**안에 src 디렉토리 안에 있는 컴포넌트들이 담김
    ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-16-20-16-57-image.png)
  
  - src 의 **index.js** 
    ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-16-20-19-50-image.png)
    
    root 태그를 불러오는것을 볼 수 있음

#### index.js

- 여러가지 전역설정이 들어감

#### app.js

- 출력되는 기본 화면

#### 컴포넌트 (사용자 정의 태그)

- **반드시 대문자**로 시작해야함

- 소문자 태그는 html 태그

#### props

- react 의 속성 (title, 등 태그의 속성)
  
  ```javascript
  function Header(props) {
      console.log('props', props, props.title);
      return <header>
      <h1><a href="/">{props.title}</a></h1>
      </header>
  }
  
  function App(){
      return (
          <div>
              <Header title="REACT"></Header>
          </div>
      )
  }
  ```

- [React 2022년 개정판 - 5. props - YouTube](https://youtu.be/t9e3hMJ_s-c?list=PLuHgQVnccGMCOGstdDZvH41x0Vtvwyxu7&t=244)

#### 표현식

- {} 안에 내용을 해석해서 표현됨

#### 목록만들기

- 반복되는 형태를 일일히 입력하기 힘듬
  
  ```javascript
  function Nav(props) {
      const lis = []
      for(let i=0; i<props.topics.length; i++){
      let t = props.topics[i];
      lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
      }
      return <nav>
          <ol>
              {lis}
          </ol>
      </nav>
  }
  function App(){
      const topics = {
          {id:1, title:'html', body:'html is ...'},
          {id:2, title:'css', body:'css is ...'},
          {id:3, title:'javascript', body:'javascript is ...'}
      }
      return (
          <div>
              <Header title="REACT"></Header>
          </div>
      )
  }
  ```

#### 이벤트

- 클릭 이벤트 발생 시

- onClick={funtion(event){}} -> vue에서 ""를 쓰는것과 다름

- event.preventDefault() -> default 태그(여기선 a태그)의 기본동작 즉, 리로드가 발생하지 않음 
  
  ```js
  function Header(props) {
      console.log('props', props, props.title);
      return <header>
      <h1><a href="/" onClick={function(event){
          event.preventDefault();
          props.onChangeMode();
      }}>{props.title}</a></h1>
      </header>
  }
  
  function App() {
      const topics = [
          {id:1, title:'html', body:'html is ...'},
          {id:2, title:'css', body:'css is ...'},
          {id:3, title:'javascript', body:'javascript is ...'}
      ]
      return (
          <div>
              <Header title="REACT" onChangeMode={function(){
                  alert('Header')
              }}></Header>
          </div>
      )
  }
  ```

- arrow function
  
  ```javascript
  function Nav(props) {
      const lis = []
      for(let i=0; i<props.topics.length; i++){
          let t = props.topics[i];
          lis.push(<li key={t.id}>
          <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
              event.preventDefault();
              props.onChangeMode(event.target.id);
          }}>{t.title}</a>
          </li>)
      }
      return <nav>
          <ol>
              {lis}
          </ol>
      </nav>
  }
  
  function App() {
      return (
          <div>
              <Header title="REACT" onChangeMode={()=>{alert('Header')}}></Header>
              <Nav topics={topics} onChangeMode={(id)=>{alert(id);}}></Nav>
          </div>
      )
  }
  ```

#### State

- 컴포넌트의 입력과 출력은 props과 return

- props과 같이 컴포넌트 함수를 이용하여 return 값을 만듬

- prop과 비슷하지만 prop은 사용하는 외부자를 위한 데이터고, state는 component를 만드는 내부자를 위한 것
  
  ```javascript
  function App() {
      const mode = 'WELCOME';
      const topics = [
          {id:1, title:'html', body:'html is ...'},
          {id:2, title:'css', body:'css is ...'},
          {id:3, title:'javascript', body:'javascript is ...'}
      ]
      let content = null;
      if(mode === 'WELCOME'){
          content = <Article title = "Welcome" body="Hello, WEB"></Article>
      } else if(mode === 'READ'){
          content = <Article title="Read" body="Hello, Read"></Article>
      }
      return (
          <div>
              <Header title="WEB" onChangeMode={()=>{
                  mode = 'WELCOME';
              }}></Header>
              <Nav topics={topics} onChangeMode={(id)=>{
                  mode = 'READ';
              }}></Nav>
              {content}
          </div>
      )
  }
  ```

- mode값을 변경해도 content가 변하지 않음
  -> App 함수를 다시 실행시키지 않았기 때문에 return값에는 변화가 없음
  -> state가 필요한 부분
  -> 우리가 원하는 건 mode가 변하면 content가 변해서 새로 return 되는 것

- **useState** 라는 **Hook**을 사용해야함
  ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-19-16-16-11-image.png)

#### useState

- useState는 초기값을 0번째 인덱스로 줌

- state의 값을 바꿀 때는 1번째 인덱스의 함수로 바꿈
  
  ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-19-17-04-14-image.png)
  ==
  
  ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-19-17-05-33-image.png)

  ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-19-17-09-52-image.png)

  ->
  ![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2023-01-19-17-10-54-image.png)



[React 2022년 개정판 - 7. state - YouTube](https://youtu.be/vmunrKR0uOU?list=PLuHgQVnccGMCOGstdDZvH41x0Vtvwyxu7&t=620)[React 2022년 개정판 - 7. state - YouTube](https://youtu.be/vmunrKR0uOU?list=PLuHgQVnccGMCOGstdDZvH41x0Vtvwyxu7&t=620)
