import {Button} from 'antd'
import React from 'react'
const env = import.meta.env

export default function Index() {
  return (
    <div>
      Index<Button type='primary'>Index</Button>
      <div>{env.MODE}dd</div>
    </div>
  )
}
