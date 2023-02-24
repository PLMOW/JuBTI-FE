import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopNav from '../page/TopNav'
import Home from '../page/Home'
import { getUser } from '../util/localstorage'
import Login from '../page/Login'
import Join from '../page/Join'
const Router = () => {
  const userInfo = getUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNav />}>
          <Route path="/" element={<Home authenticated={userInfo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Join" element={<Join />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
