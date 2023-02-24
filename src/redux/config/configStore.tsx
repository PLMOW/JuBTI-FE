import { configureStore } from '@reduxjs/toolkit'
import crud from '../modules/crud'

const store = configureStore({
  reducer: {
    crud,
  },
})

export default store
