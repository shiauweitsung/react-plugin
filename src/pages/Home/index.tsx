import React, { useEffect } from 'react';

type Props = {
  a: String;
};

const data = [
  {
    name: 'jack',
    age: 1,
  },
  {
    name: 'jack2',
    age: 2,
  },
  {
    name: 'jack3',
    age: 3,
  },
];

export default function Home(props: Props) {
  useEffect(() => {
    data.forEach((item, index, self) => {
      console.log(item, index, self, 'self');
    });
  }, []);
  return (
    <div>
      home 組件
      <h4>使用props接收傳遞進來的值 包含router傳的</h4>
      {props.a}
    </div>
  );
}
