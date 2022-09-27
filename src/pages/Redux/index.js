import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementAsync, getCount, showState } from '../../store/counter'
import { changeHeaderShow } from '../../store/status'

export default function Redux () {
  const count = useSelector((state) => state.counter.value)
  const state = useSelector((state) => state)
  const a = useSelector(getCount)
  console.log(a, 'a')
  const dispatch = useDispatch()
  console.log(state)
  const [value, setValue] = useState(Number)
  return (
        <div>
            <h2>Redux 練習</h2>
            {value}
            <button
                onClick={() => {
                  setValue((prev) => {
                    console.log(prev, 'prev')
                    return Number(prev + 1)
                  })
                }}
            >
                state callback test
            </button>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(showState('123'))}
            >
                showState
            </button>
            <button
                onClick={() => dispatch(incrementAsync(Number(2) || 0))}
            >
                Add Async
            </button>
            <button
                onClick={() => dispatch(changeHeaderShow())}
            >
                header show and close
            </button>
        </div>
  )
}
