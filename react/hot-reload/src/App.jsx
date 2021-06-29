import React, {useState} from 'react'
import {hot} from 'react-hot-loader/root'

const App = () => {
  const [count, setCount] = useState(0)
  return <>
  <div onClick={() => setCount(count + 1)}>App2 {count}</div>
  <span>{count}</span>
  </>
}

export default hot(App)