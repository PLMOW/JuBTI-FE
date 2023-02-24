import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, ButtonWrap, CenterWrapper, H1, Input, Label } from './Login'

function Join() {
  const [isId, setId] = useState('')
  const [isPassword, setPassword] = useState('')
  const navigate = useNavigate()
  const JoinHandler = async () => {
    console.log(isId, isPassword)
    const body = {
      id: isId,
      password: isPassword,
    }
    axios
      .post(`/register`, body, {
        withCredentials: true,
      })
      .then((res) => {
        alert('회원가입완료')
        navigate('/login')
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }
  return (
    <>
      <CenterWrapper>
        <H1>회원가입</H1>
        <Label>아이디</Label>
        <Input
          type="text"
          value={isId}
          onChange={(e) => setId(e.target.value)}
        />
        <Label>비밀번호</Label>
        <Input
          type="password"
          value={isPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonWrap>
          <Button
            width="150px"
            fontWeight="600"
            bgColor="#000"
            border="3px solid #fff"
            color="white"
            height="50px"
            onClick={JoinHandler}
          >
            화원가입하기
          </Button>
          <Button
            width="150px"
            fontWeight="600"
            bgColor="#fff"
            border="3px solid black"
            height="50px"
            onClick={() => {
              navigate('/login')
            }}
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

export default Join
