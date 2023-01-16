# React Component Type

## Class Component

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className="react">{name}</div>
  }
}

export default App;
```

## Function Component

```js
import React from 'react';

const myComponent = () => {
  return <div>함수형 컴포넌트</div>;
};

export default MyComponent;
```

---

# props

## props 사용해보기

> props란?

- 컴포넌트 속성을 설정할 때 사용하는 요소

- props값은 해당 컴포넌트를 불러와 사용하는 `부모 컴포넌트`에서 설정할 수 있다.

```js
// MyComponent.js

import React from 'react';

const Mycomponent = props => {
  return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>
};

export default MyComponent;

```

```js
import React from "react";
import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="React" />;
};

export default App;
```

## Children

> children이란?

- 컴포넌트 태그 사이의 내용을 보여주는 props
  
```js
// MyComponent.js

import React from 'react';

const Mycomponent = props => {
  return (
    <div>
      안녕하세요, 제 이름은 {props.name}입니다. <br/>
      children 값은 {props.children}입니다.
    </div>

  );
};

// props의 기본값 설정방법
MyComponent.defaultProps = {
  name: '기본 이름'
}

export default MyComponent;
```

```js
// App.js

import React from "react";
import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="React" />;
};

export default App;
```

## 비구조화 할당 문법

- ES6의 비구조화 할당 문법을 사용하여 내부의 값을 바로 추출할 수 있음

```js
// MyComponent.js

import React from 'react';

const Mycomponent = props => {
  const { name, children } = props;
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br/>
      children 값은 {children}입니다.
    </div>

  );
};

MyComponent.defaultProps = {
  name: '기본 이름'
}

export default MyComponent;
```

- 파라미터 부분에서 비구조화 할당을 바로 사용해도 됨

```js
// MyComponent.js

import React from 'react';

const Mycomponent = ({ name, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br/>
      children 값은 {children}입니다.
    </div>

  );
};

MyComponent.defaultProps = {
  name: '기본 이름'
}

export default MyComponent;
```

---

# State

## 클래스형 컴포넌트의 state

```js
// Counter.js

import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      fixedNumber: 0
    };
  }
  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>변하지 않는 값 : {fixedNumber}</h2>
        <button onClick={() => {
          this.setState({ number: number + 1 });
        }}>
          + 1
        </button>
      </div>
    );
  }
}

export default Counter;
```

```js
// App.js

import React from "react";
import Counter from "./Counter";

const App = () => {
  return <Counter />;
};

export default App;
```

- 클래스형 컴포넌트에서 constructor를 작성할 때는 반드시 `super(props)`를 호출해야 함. 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component의 지닌 생성자 함수를 호출해줌

- 컴포넌트의 state는 객체 형식이어야 함.

- render함수에서 현재 state 조회 : `this.state` 이용

- state값을 바꾸는 방법 : `this.setState` 이용
  - 인자로 전달된 객체 안에 들어있는 값만 변경해줌(예시의 경우 fixedNumber는 this.setState에 인자로 전달되지 않았기 때문에 값이 변경되지 않음!)

## state를 constructor에서 꺼내기

```js
import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0
  }
  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>변하지 않는 값 : {fixedNumber}</h2>
        <button onClick={() => {
          this.setState({ number: number + 1 });
        }}>
          + 1
        </button>
      </div>
    );
  }
}

export default Counter;
```

- 위의 코드처럼 constructor메서드를 사용하지 않고 바로 state의 초기값을 설정할 수 있다.

- 단, state를 조회할 때에는 여전히 `this`를 붙여서 가져와야 함!

## 객체 대신 함수 인자 전달하기

```js
<button onClick={() => {
  this.setState({ number: number + 1 });
  this.setState({ number: this.state.number + 1 });
}}>
```

- 위와 같이 this.setState를 두 번 사용한다고 해도 버튼을 클릭할 때에는 1씩 증가하게 된다.

- 이는 `this.setState로 값이 없데이트 될 때에는 비동기적으로` 업데이트되기 때문이다.


## this.setState가 끝난 후 특정 작업 실행하기

```js
<button onClick={() => {
  this.setState(
    // 첫 번째 파라미터
    {
      number: number + 1
    },
    // 두 번째 파라미터
    () => {
      console.log('state 호출됨');
      console.log(this.state);
    }
  );
}}>
```

- setState의 `두 번째 파라미터`로 `콜백 함수`를 등록하여 작업을 처리할 수 있다.

## `useState` 활용하기

- 리액트 16.8 이전 버전에서는 함수형 컴포넌트에서 state를 사용할 수 없었다.

- 16.8 이후 부터 useState라는 함수를 사용하여 함수형 컴포넌트에서도 state를 사용가능! => `Hooks를 이용`

> 배열 비구조화 할당

```js
const array = [1, 2];
const [one, two] = array;
console.log(one)  // 1 출력
console.log(two)  // 2 출력
```

```js
// Say.js

import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState('');
  // useState 함수의 argument에는 초기값(여기서는 string이므로 '')
  // 배열의 첫 번째 원소는 현재 상태
  // 배열의 두 번째 원소는 상태를 바꾸어주는 함수 (Setter)
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

```js
// App.js

import React from "react";
import Say from "./Say";

const App = () => {
  return <Say />;
};

export default App;
```

![image](https://user-images.githubusercontent.com/109258306/211795565-6a2a3602-ed51-49e5-b2a3-3815c692e79b.png)

- `const [ 현재 상태를 나타낼 변수, Setter함수 ] = useState(상태의 초기값)` 의 형태로 작성

