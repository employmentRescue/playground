import { useState, useMemo, useCallback } from "react";

const getAverage = (numbers: any) => {
  console.log('평균값 계산중')
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((a: number, b: number) => a + b);
  return sum / numbers.length;
}

const Average = () => {
  const [list, setList] = useState([]);
  const [num, setNum] = useState('');

  const onChange = useCallback((e: any) => {
    setNum(e.target.value)
  }, [])

  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(num));
    setList(nextList);
    setNum('');
  }, [num, list]);

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={num} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균:</b> {avg}
      </div>
    </div>
  )
}

export default Average;