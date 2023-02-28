import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setCookie } from '../util/cookie'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { todoUpdateLogin } from '../redux/modules/login'
function Login() {
  const [isId, setId] = useState('')
  const [isPassword, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LoginHandler = async () => {
    const res = await axios
      .post(`http://3.36.29.101/api/auth/login`, {
        username: isId,
        password: isPassword,
      })
      .then((res) => {
        let target = res.headers.authorization
        // res.headers.get('Authorization')
        let token = target.split(' ')[1] //여기서 베어러 잘랐어요
        // const token = res.data.headers.to

        setCookie('accessToken', res.headers.authorization) // 쿠키에저장
        const decodedUserInfo = jwt_decode(token)
        console.log('decode', decodedUserInfo)
        localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo))
        dispatch(todoUpdateLogin({ login: true }))
        alert('로그인완료')
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })
  }
  const login = useSelector((state: any) => {
    return state.login.login
  })
  console.log('login :', login)

  return (
    <>
      <CenterWrapper>
        <H1>로그인하기</H1>
        <Label>아이디</Label>
        <Input
          type="text"
          value={isId}
          onChange={(e: any) => setId(e.target.value)}
        />
        <Label>비밀번호</Label>
        <Input
          type="password"
          value={isPassword}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <ButtonWrap>
          <Button
            width="150px"
            fontWeight="600"
            bgColor="#000"
            border="3px solid #fff"
            color="white"
            height="50px"
            onClick={LoginHandler}
          >
            로그인
          </Button>
          <Button
            width="150px"
            fontWeight="600"
            bgColor="#fff"
            border="3px solid black"
            height="50px"
            onClick={() => {
              navigate('/join')
            }}
          >
            회원가입
          </Button>
          <Button
            width="150px"
            fontWeight="600"
            bgColor="#fff"
            border="3px solid black"
            height="50px"
            onClick={() => {
              navigate('/')
            }}
          >
            Home
          </Button>
        </ButtonWrap>
      </CenterWrapper>
    </>
  )
}
export const CenterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'LINESeedKR-Bd';
  width: 470px;
`
export const Label = styled.div`
  margin: 17px 0px 10px;

  font-size: 20px;
  font-weight: bold;
`
export const H1 = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 25px;
`
export const Input = styled.input<any>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '50px')};
  border: 2px solid #000;
  border-radius: 15px;
  padding-left: 15px;
  font-size: 20px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '20px')};
`
export const ButtonWrap = styled.div`
  margin-top: 30px;
  display: inline-flex;
  gap: 10px;
`
export const Button = styled.button<{
  width?: string
  bgColor?: string
  color?: string
  border?: string
  fontWeight?: string
  height?: string
}>`
  border: ${(props) => (props.border ? props.border : null)};
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : null)};
  color: ${({ color }) => (color ? color : '#000')};
  height: ${(props) => (props.height ? props.height : '45px')};
  padding: 1px 6px;

  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : null)};
  font-family: 'LINESeedKR-Bd';
  width: ${(props) => (props.width ? props.width : '110px')};
  &:active {
    filter: brightness(50%);
  }
`
export default Login
