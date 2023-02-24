import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getUser, removeUser } from '../util/localstorage'
import '../index.css'
const TopNav = ({ children, user }: any) => {
  const userInfo = getUser()

  const navigate = useNavigate()
  const logoutHandler = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      removeUser()
      window.location.reload()
      navigate('/login')
      alert('로그아웃완료')
    }
    return
  }

  return (
    <div>
      <Nav>
        {userInfo ? (
          <InNavWrap>
            <div>
              <img src="/public/logo.png" alt="logo" />
            </div>
            <InNav>
              <h4>
                <B>{userInfo.id}</B>님 반갑습니다😃
              </h4>
              <Button onClick={logoutHandler}>로그아웃</Button>
            </InNav>
          </InNavWrap>
        ) : (
          <InNavWrap>
            <div>
              <img
                style={{ width: '80px' }}
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="logo"
              />
            </div>
            <InNav>
              <Button onClick={() => navigate('/login')}>로그인</Button>
              <Button onClick={() => navigate('/join')}>회원가입</Button>
            </InNav>
          </InNavWrap>
        )}
      </Nav>
      {children || <Outlet />}
    </div>
  )
}
const Nav = styled.div`
  background-color: white;
  font-family: 'LINESeedKR-Bd';
  filter: drop-shadow(2px 4px 6px black);
`
const InNavWrap = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 20px;
`
const Button = styled.button`
  color: black;
  font-family: 'LINESeedKR-Bd';
  font-size: 14px;
`
const InNav = styled.div`
  display: flex;
  gap: 10px;
`
const B = styled.b`
  font-weight: bold;
`
export default TopNav
