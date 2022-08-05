import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'

const Dick = () => {
  const [name, setName] = useState('')
  const [length, setLength] = useState()
  const [time, setTime] = useState()
  // const [countDownTIme, setCountDownTime] = useState(0);
  const nameRef = useRef(null)
  const lengthRef = useRef(null)
  const timeRef = useRef(null)
  const [imgWidth, setImgWidth] = useState(length)

  const [status, setStatus] = useState(false)
  // finished fire
  const [fire, setFire] = useState(false)
  // dick show
  const [dickShow, setDickShow] = useState(false)

  const [countDownSeconds, setCountDownSeconds] = useState(0)

  const makeClick = () => {
    // const name = nameRef.current.value;
    // const length = lengthRef.current.value;
    // const time = timeRef.current.value;
    if (time <= 0) {
      alert('你不可能0秒 至少1秒吧')
      return
    } else if (time > 30) {
      alert('少騙 你不可能超過30秒')
      return
    }
    if (name === '') {
      alert('請輸入名字')
      return
    }
    // setCountDownTime(time);
    setStatus(true)
    setDickShow(true)
    // 輸入時間
    // const seconds = countDownTIme;
    const seconds = time
    // 先讓畫面秒數同步
    setCountDownSeconds(time)
    const peTimes = Math.floor(Math.random() * time)
    // 現在時間
    const startTIme = Date.now()
    const countDown = setInterval(() => {
      // 下一秒時間
      const nextSecond = parseInt((Date.now() - startTIme) / 1000)
      // 倒數時間 = 輸入時間 - 下一秒時間
      const countDownSec = seconds - nextSecond
      setCountDownSeconds(countDownSec - peTimes < 0 ? 0 : countDownSec)
      if (countDownSec - peTimes <= 0) {
        clearInterval(countDown)
        setCountDownSeconds(0)
        setTime(0)
        setFire(true)
        alert(`opps 你早洩了${peTimes}秒`)
      };
    }, 1000)
  }

  useEffect(() => {
    setTimeout(() => {
      setFire(false)
      setDickShow(false)
      setStatus(false)
    }, 2500)
  }, [fire])

  // useEffect(() => {
  //     //輸入時間
  //     const seconds = countDownTIme;
  //     //先讓畫面秒數同步
  //     setCountDownSeconds(time);
  //     const peTimes = Math.floor(Math.random() * time);
  //     //現在時間
  //     const startTIme = Date.now();
  //     const countDown = setInterval(() => {
  //         //下一秒時間
  //         const nextSecond = parseInt((Date.now() - startTIme) / 1000);
  //         //倒數時間 = 輸入時間 - 下一秒時間
  //         const countDownSec = seconds - nextSecond;
  //         setCountDownSeconds(countDownSec - peTimes < 0 ? 0 : countDownSec);
  //         if (countDownSec - peTimes <= 0) {
  //             clearInterval(countDown);
  //             setCountDownSeconds(0);
  //             setTime(0);
  //             alert(`opps 你早洩了${peTimes}秒`);
  //         };
  //     }, 1000);
  //     return () => {
  //         clearInterval(countDown);
  //     }
  // }, [countDownTIme])

  return (
        <div className="dick">
            <div className="dick-container">
                <div className="dick-title">
                    Dick Test
                </div>
                <div className="dick-form">
                    <div className="dick-form-item">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value)
                            }}
                            ref={nameRef}
                            disabled={status}
                            placeholder="please enter your name"
                        />
                    </div>
                    <div className="dick-form-item">
                        <label htmlFor="length">Your dick length</label>
                        <input
                            type="number"
                            name="length"
                            value={length}
                            placeholder="enter your dick length"
                            onChange={(event) => {
                              setLength(event.target.value)

                              if (length > 30) {
                                alert('別騙了 你沒有超過30cm')
                                setLength('1')
                                setImgWidth('1')
                              } else {
                                setImgWidth(event.target.value)
                              }
                            }}
                            onBlur={() => {
                              if (length > 30) {
                                alert('別騙了 你沒有超過30cm')
                                setLength('1')
                                setImgWidth('1')
                              }
                            }}
                            ref={lengthRef}
                            disabled={status}
                        />
                    </div>
                    <div className="dick-form-item">
                        <label htmlFor="time">Expected DIY time (seconds)</label>
                        <input
                            type="number"
                            name="time"
                            value={time}
                            placeholder="enter your DIY time"
                            onChange={(event) => {
                              setTime(event.target.value)
                            }}
                            onBlur={() => {
                              if (time < 1) {
                                alert('至少一秒吧')
                                setTime('1')
                              } else if (time <= 0) {
                                alert('至少一秒吧')
                                setTime('1')
                              }
                            }}
                            ref={timeRef}
                            disabled={status}
                        />
                    </div>
                    {status
                      ? <>
                            <div className="dick-time">
                                <p>Make ing</p>
                                {new Date(countDownSeconds * 1000).toISOString().substr(11, 8)}
                            </div>
                        </>
                      : null
                    }
                    {dickShow &&
                        <div className="dick-start">
                            <p>Your dick size</p>
                            <img
                                className={classnames('dick-img', {
                                  animation: status
                                })}
                                src={require('../../images/dick.png')}
                                alt="dick"
                                width={`${imgWidth + 5}`}
                            // height={20}
                            />
                            <img
                                className={classnames('dick-son', {
                                  fire
                                })}
                                src={require('../../images/son.png')}
                                alt="son"
                                width={30}
                            />
                        </div>
                    }
                    <button
                        className={classnames('dick-button', {
                          disabled: status
                        })}
                        onClick={makeClick}
                        disabled={status}
                    >
                        Dick Test start
                    </button>
                </div>

            </div>
        </div>
  )
}

export default Dick
