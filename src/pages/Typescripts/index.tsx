import React from 'react';

// Ib age屬性為可有可無
type Ib = {
  name: string;
  age?: number;
};
// Ic 屬性結構：name為必須，且可以增加其他屬性
type Ic = {
  name: string;
  [propName: string]: any;
};
// Id 為一個function type 帶入兩個參數 且回傳為number
type Id = (a: number, b: number) => number;

function d<Id>(n1: number, n2: number) {
  console.log(n1 + n2);
  return n1 + n2;
}
// Ie 字串array
type Ie = string[] | Array<string>; // 這兩個是一樣意思
const e: Ie = ['1'];
// Ie 數值array
type If = number[] | Array<number>; // 這兩個是一樣意思
const f: If = [1];
//
enum Gender {
  Male = 0,
  Female = 1,
}
const i: { name: string; gender: Gender } = {
  name: 'jack',
  gender: Gender.Female,
};
// console.log(i.gender);

function TypeScriptCom() {
  return (
    <div>
      <p>安裝方法：</p>
      <p>
        yarn add typescript @types/node @types/react @types/react-dom
        @types/jest
      </p>
      <p>新增一個tsconfig.json</p>
      <p>新增設定：</p>
      <p>
        <a href="https://ithelp.ithome.com.tw/articles/10226481">點此查看</a>
      </p>
      <button
        onClick={() => {
          d(1, 2);
        }}
      >
        d func
      </button>
    </div>
  );
}

export default TypeScriptCom;
