import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectBoxs from '../components/SelectBoxs'
import { Button, ButtonWrap, CenterWrapper, H1, Input, Label } from './Login'

function Join() {
  const [isId, setId] = useState('')
  const [isNickName, setNickName] = useState('')
  const [isPassword, setPassword] = useState('')
  const [isPasswordCheck, setPasswordCheck] = useState('')
  const [isSelectData, selectData] = useState('')
  const navigate = useNavigate()
  const JoinHandler = async () => {
    // 비밀번호 : 특수문자 1~8까지 대소문자 숫자 8~15자리
    let idRegExp = /^[a-z0-9]{4,10}$/
    if (!idRegExp.test(isId))
      return alert('ID를 숫자와 소문자 4~10자리로 입력해주세요')

    if (isId === '' || isNickName === '')
      return alert('아이디, 이름을 입력해주세요.')
    if (isPassword === '' || isPasswordCheck === '')
      return alert('비밀번호를 입력해주세요.')
    if (isPassword !== isPasswordCheck)
      return alert('패스워드가 일치하지 않습니다.')
    let pwRegExp = /[!@#$%^&*A-Za-z0-9]{8,15}/
    if (!pwRegExp.test(isPassword)) {
      return alert(
        'PW를 특수문자 1~8까지 대소문자 숫자 8~15자리로 입력해주세요.'
      )
    }
    if (isSelectData === '') return alert('MBTI를 선택해주세요.')
    const body = {
      username: isId,
      nickname: isNickName,
      password: isPassword,
      mbti: isSelectData,
    }
    console.log(isId.length)
    axios
      .post(`http://3.36.29.101/api/auth/signup`, body, {})
      .then((res) => {
        alert('회원가입완료')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        alert('다시시도해주시기 바랍니다.')
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
          onChange={(e: any) => setId(e.target.value)}
        />
        <Label>닉네임</Label>
        <Input
          type="text"
          value={isNickName}
          onChange={(e: any) => setNickName(e.target.value)}
        />
        <Label>비밀번호</Label>
        <Input
          type="password"
          value={isPassword}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <Label>비밀번호확인</Label>
        <Input
          type="password"
          value={isPasswordCheck}
          onChange={(e: any) => setPasswordCheck(e.target.value)}
        />
        <Label>MBTI</Label>
        <SelectBoxs
          optionData={[
            'ISTJ',
            'ISTP',
            'INFJ',
            'INTJ',
            'ISFJ',
            'ISFP',
            'INFP',
            'INTP',
            'ESTJ',
            'ESFP',
            'ENFP',
            'ENTP',
            'ESFJ',
            'ESTP',
            'ENFJ',
            'ENTJ',
          ]}
          selectData={selectData}
        ></SelectBoxs>
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
