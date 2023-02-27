import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopNav from '../page/TopNav'
import Home from '../page/Home'
import { getUser } from '../util/localstorage'
import Login from '../page/Login'
import Join from '../page/Join'
import MainPage from '../page/MainPage'
import Detail from '../page/Detail'
import CreateForm from '../page/CreateForm'
const Router = () => {
  const userInfo = getUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNav />}>
          {/* <Route path="/" element={<MainPage authenticated={userInfo} />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createform" element={<CreateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
