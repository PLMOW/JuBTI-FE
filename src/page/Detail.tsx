import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from '../util/cookie'
import { getUser } from '../util/localstorage'
import { Button, Input } from './Login'
// import { Cookies } from 'react-cookie'

function Detail() {
  const data = [1]
  const [isComment, setComment] = useState('')
  const userInfo = getUser()
  const params = useParams()
  const [isData, setData] = useState<any>([])
  let token = getCookie('accessToken') // 쿠키에저장

  axios.defaults.baseURL = 'http://3.36.29.101'
  const onSubmitHandler = async () => {
    const res = axios
      .post(
        `/api/recipe/${params?.id}/comment`,
        {
          comments: isComment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        alert(`${res.data.mag}`)
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })
  }

  useEffect(() => {
    axios
      .get(`/api/recipe/${params?.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data)
        console.log(res.data)
      })
  }, [])
  return (
    <CenterWrapperDetail>
      {/* <h1 style={{ fontSize: '30px', marginBottom: '10px' }}>
        {prams.id} deatail page
      </h1> */}
      <ContentsWrap>
        <div>
          <Img src={isData?.image} alt="" />
        </div>
        <ContentsWrapIn>
          <ContentTopName>{isData?.title}</ContentTopName>
          <div>
            <ContentName>
              {isData?.mbti} ({isData?.material}) / {isData?.nickname}
            </ContentName>
            <div
              style={{
                borderTop: '1px solid #e0e0e0',
                padding: '20px 0px',
              }}
            >
              {isData?.content}
            </div>
          </div>
        </ContentsWrapIn>
      </ContentsWrap>
      <CommnetsWrap>
        <CommnetsInner
          style={{
            marginBottom: '24px',
            paddingBottom: '8px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          Comments ({data.length})
        </CommnetsInner>
        <div style={{ color: '#909090', fontSize: '20px' }}>id/이름/내용</div>
        {data?.map((el: number) => {
          return <Comment key={el}>1/김영현/글렌피딕을 좋아합니다.</Comment>
        })}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Input
            width={'250px'}
            height={'30px'}
            fontSize={'15px'}
            type="text"
            placeholder="내용"
            value={isComment}
            onChange={(e: any) => {
              setComment(e.target.value)
            }}
          />
          <Button
            width="70px"
            fontWeight="600"
            bgColor="#000"
            border="2px solid #000"
            color="white"
            height="30px"
            onClick={onSubmitHandler}
          >
            작성
          </Button>
        </div>
      </CommnetsWrap>
    </CenterWrapperDetail>
  )
}
const CenterWrapperDetail = styled.div`
  width: 800px;
  height: auto;
  margin: 150px auto;
`
const Img = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 30px;
  object-fit: cover;
`
const ContentsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 46px;
`
const CommnetsWrap = styled.div`
  margin-top: 80px;
  padding: 10px;
  border-radius: 15px;
`
const ContentsWrapIn = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`
const CommnetsInner = styled.div`
  margin-bottom: 24px;
  padding-bottom: 8px 24px;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Pretendard-Black';
  font-size: 20px;
`
const ContentName = styled.div`
  font-weight: bold;
  margin: 20px 0px;
  font-size: 20px;
`
const ContentTopName = styled(ContentName)`
  overflow: hidden;
  margin-bottom: 57px;
  font-size: 35px;
  font-weight: 800;
  color: #222222;
  line-height: 36px;
  word-break: break-all;
`
const Comment = styled.div`
  font-size: 16px;
  padding: 5px;
`
export default Detail
