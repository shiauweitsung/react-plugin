import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    count: 100
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    showState: (state, action) => {
      console.log('state :', state.count)
      console.log('action :', action)
    }
  }
})

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 3000)
}

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, showState } = counterSlice.actions
export const getCount = (state) => state.counter.count

export default counterSlice.reducer
