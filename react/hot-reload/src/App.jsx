import React, {useState} from 'react'
import {hot} from 'react-hot-loader/root'
import Button from './components/Button'

const App = () => {
  const [count, setCount] = useState(0)
  return <>
  <div onClick={() => setCount(count + 1)}>ayou {count}</div>
  <span>{count}</span>
  <Button />
  </>
}

debugger
const HotApp = hot(App)
export default HotApp