# Ref

## ref란?

- HTML을 직접 작성할 때, `<div id="my-id">`와 같이 id를 사용하여 DOM에 이름을 다는 것 처럼, React에서도 `DOM을 선택하여 직접 접근`하기 위해 ref를 사용한다.

- 어떤 상황에서 사용해야 할까?
  - React에서 state같은 방식으로 해결할 수 없는, `DOM을 반드시 직접 건드려야 할 때`
  - ex) DOM요소의 값 가져오기, 특정 input에 focus주기, 스크롤 박스 조작, Canvas 요소에 그림 그리기 등

## ref를 이용하여 특정 input에 focus 주기

```js
// App.js

import Validation from './Validation';

function App() {
  return (
    <>
      <Validation />
    </>
  );
}

export default App;
```


```js
// Validation.js

import { Component } from "react";
import './Validation.css';

class Validation extends Component {
  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    })
    this.input.focus();
  }

  render() {
    return (
      <div>
        <input
          ref={(ref) => this.input = ref}
          // ref 코드가 주석처리 되어있으면 handleButtonClick 함수의 this.input.focus()가 적용되지 않음!!
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    )
  }
}

export default Validation
```

- 위의 Validation.js코드는 '검증하기' 버튼을 눌렀을 때 input으로 focus가 이동하여 커서가 깜빡이도록 하는 코드임.

- `handleButtonClick`함수의 `this.input.focus()`가 수행되기 위해서는 어쩔 수 없이 DOM에 직접 접근해야 한다.

- 이 때 `input 요소에 ref라는 콜백 함수를 props로 전달`해줌으로써 DOM에 직접 접근하게 할 수 있다.

```js
import React, { Component } from "react";
import './Validation.css';

class Validation extends Component {

  textInput = React.createRef();
  
  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    })
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input
          ref={this.textInput}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    )
  }
}

export default Validation
```

- 위처럼 `React.createRef()`를 통해서도 ref 전달이 가능하다.