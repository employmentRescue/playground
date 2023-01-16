# 리액트의 이벤트 시스템

## React event handling

- 리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트 인터페이스와 유사함

```js
// Say.js

import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState('');
  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히 가세요!');

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  )
}

export default Say
```

## ⛔이벤트 사용시 주의 사항

- 이벤트 이름은 카멜 표기법으로!
  - 예를 들어 HTML 의 `onclick, onkeyup`은 리액트에서 `onClick, onKeyUp`으로

- 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달
  - 위의 예제에서도 onClickEnter, onClickLeave이라는 함수를 만들어 전달하였음

- DOM 요소에만 이벤트 설정이 가능
  - div, button, input, form, span등의 DOM요소에만!

## onChange 이벤트 핸들링해보기

```js
import React, { Component } from "react";

class EvenPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 핸들링</h1>
        <input
          type="text"
          name="message"
          onChange={
            (e) => {
              console.log(e.target.value)
            }
          }
        />
      </div>
    )
  }
}

export default EvenPractice
```

![image](https://user-images.githubusercontent.com/109258306/211807746-5a92298c-b028-4680-96e2-69af752bc794.png)

- `e`에 기록되는 객체는 SyntheticEvent로, 웹 브라우저의 네이티브 이벤트를 감싸는 객체

## state에 input 값 담아보기

```js
import React, { Component } from "react";

class EvenPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 핸들링</h1>
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={
            (e) => {
              this.setState({
                message: e.target.value
              })
            }
          }
        />
      </div>
    )
  }
}

export default EvenPractice
```

## Property Initializer Syntax를 사용한 메서드 작성

- 메서드 바인딩은 생성자 메서드에서 하는 것이 정석이나, 불편함

- Babel의 transform-class-properties 문법을 사용하여 arrow function의 형태로 메서드를 정의하는 방법

```js
// EventMethod.js

import React, { Component } from "react";

class EvenPractice extends Component {

  state = {
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="message"
        value={this.state.message}
        onChange={this.handleChange}
      />
      <button onClick={this.handleClick}>확인!</button>
    </div>
  }
}

export default EvenPractice
```

## onKeyPress 이벤트

```js
// EventPractice.js

import { Component } from 'react';

class EventPractice extends Component {

  state = {
    username: '',
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message)
    this.setState({
      username: '',
      message: ''
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
      console.log(e)
    }
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명 입력"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해봐"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    )
  }
}

export default EventPractice;
```