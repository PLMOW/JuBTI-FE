import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

interface Icrud {
  id: number
  title: string
  content: string
  done: boolean
}
// 초기상태값 필요(state)
const initialState: any = {
  crud: [
    {
      id: 1,
      title: '리액트 강의보기',
      content: '챕터 1부터 챕터 12까지 학습',
      done: false,
    },
    {
      id: 2,
      title: '점심 먹기',
      content: '점심 뭐먹지..?!',
      done: false,
    },
  ],
  isLoading: false,
  isError: false,
  error: null,
}

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    todoCreate: (state, action) => {
      //return [...state, action.payload]
      return { crud: [...state.crud, action.payload] }
      //return [...state.crud, action.payload]
    },
    todoUpdate: (state, action) => {
      return {
        crud: [
          ...state.crud.map((todo: any) =>
            todo.id === action.payload ? { ...todo, done: !todo.done } : todo
          ),
        ],
      }
    },
    todoDelete: (state, action) => {
      return {
        crud: [...state.crud.filter((todo: any) => todo.id !== action.payload)],
      }
    },
  },
})
export default crudSlice.reducer //리듀서
export const { todoDelete, todoCreate, todoUpdate } = crudSlice.actions //액션크리에이터
