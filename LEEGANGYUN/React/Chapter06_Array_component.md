# 컴포넌트 반복

## 반복되는 코드가 필요할 때

```js
const IterationSample = () => {
  return (
    <ul>
      <li>눈사람</li>
      <li>얼음</li>
      <li>눈</li>
      <li>바람</li>
    </ul>
  )
}
```

- `<li>...</li>`의 형태가 반복된다.

- 코드가 복잡해지고, 보여주어야 할 데이터가 유동적이라면 매우 비효율적인 코드가 된다.

- 반복적인 내용을 효율적으로 보여주고 관리하는 방법이 필요!

## 컴포넌트 수정해보기

```js
const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name) => <li>{name}</li>);
  return <ul>{nameList}</ul>
}

export default IterationSample;
```

- `map()`함수를 이용하여 `<li>`태그로 감싸진 새로운 배열을 만들어 새로운 변수에 담는다.

![image](https://user-images.githubusercontent.com/109258306/212524777-9c1c1775-aa30-45a6-95a0-e4cbf5bb8997.png)

- 하지만 개발자 도구를 열어보았을 때, `"key" prop`이 없다는 메세지가 뜬다.

## key

- React에서 key는 컴포넌트 배열을 렌더링했을 때 `어떤 원소에 변동이 있었는지` 알아내려고 사용

- key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 확인하여 변화를 감지하지만, key가 있다면 이를 이용하여 어떠한 변화가 일어났는지 더욱 빠르게 알 수 있게 해줌

```js
const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>
}

export default IterationSample;
```

- 위의 코드처럼 key 값을 설정할 때에는 map 함수의 인자로 전달되는 함수 내부에서 props를 설정하듯이 수행하면 된다. 단, `key값은 항상 유일한 값`이어야 한다.

- 예제의 컴포넌트에는 고유한 값이 없으므로 map 함수에 전달되는 콜백 함수의 인수인 index를 사용하였음.

## 데이터 추가, 데이터 삭제 기능 구현해보기

```js
import { useState } from "react";

const IterationPractice = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' }
  ]);
  const [inputText, setInputText] = useState('')
  const [nextId, setNextId] = useState(5) // 새로운 항목을 추가할 때의 id값
  const onChange = e => setInputText(e.target.value);

  // onClick : 버튼 클릭시 새로운 항목 추가
  const onClick = () => {
    const nextName = names.concat({
      id: nextId,
      text: inputText
    })
    setNextId(nextId + 1);
    setNames(nextName);
    setInputText('')
  }

  // onRemove : 항목을 더블클릭하여 해당 항목 제거
  const onRemove = id => {
    const nextNames = names.filter(name => name.id !== id);
    setNames(nextNames);
  }

  const nameList = names.map((name) =>
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>);
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  )

}

export default IterationPractice;
```

- 배열에 새 항목을 추가할 때 `push함수를 사용하지 않고 concat를 사용`한 이유?
  - push함수는 기존 배열 자체를 변경, concat는 새로운 배열을 만들어줌
  - React에서는 `상태를 업데이트할 때 기존 상태를 그대로 두면서 새로운 상태로 설정(불변성 유지)`해야 컴포넌트의 성능을 최적화할 수 있다.

- 상태 안에서 배열을 변형할 때에는 직접 접근하여 수정하는 것이 아니라 concat, filter등의 배열 내장 함수를 사용하여 배열을 만든 후 새로운 상태로 설정해 주어야 한다는 점을 명심하자!