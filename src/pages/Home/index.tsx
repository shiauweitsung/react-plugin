import React from 'react'

type Props = {
  a: String
}

export default function Home (props: Props) {
  return (
    <div>
      home 組件
      <h4>使用props接收傳遞進來的值 包含router傳的</h4>
      {props.a}
    </div>
  )
}
