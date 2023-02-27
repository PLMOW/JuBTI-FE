import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

interface Ilogin {
  id: number
  title: string
  content: string
  done: boolean
}
// 초기상태값 필요(state)
const initialState: any = {
  login: [
    {
      login: false,
    },
  ],
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    todoUpdateLogin: (state, action) => {
      console.log(state)
      console.log(action.payload) //{login:true}
      return {
        ...state.login.map((todo: any) => todo),
      }
    },
  },
})
export default loginSlice.reducer //리듀서
export const { todoUpdateLogin } = loginSlice.actions //액션크리에이터
