import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import ChatBox from '../asset/svg/ChatBox'
import Heart from '../asset/svg/Heart'
import Modify from '../asset/svg/Modify'
import Xmark from '../asset/svg/Xmark'
import { getCookie } from '../util/cookie'
import { getUser } from '../util/localstorage'
import { Button, Input } from './Login'
import Carousel from 'nuka-carousel/lib/carousel'
// import { Cookies } from 'react-cookie'

function Detail() {
  const userInfo = getUser()
  const navigate = useNavigate()
  const [isComment, setComment] = useState('')
  const params = useParams()
  const [isData, setData] = useState<any>(false)
  const [isHearts, setHearts] = useState(false)
  let token = getCookie('accessToken') // 쿠키에저장

  axios.defaults.baseURL = 'http://3.36.29.101'
  const LikeHandlerBtn = useCallback(() => {
    axios
      .post(
        `/api/recipe/${params?.id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res)
        setHearts((prev) => !prev)
      })
    window.location.reload()
  }, [])
  const onSubmitHandler = () => {
    if (isComment === '') {
      alert('무엇이든 입력하세요')
      return
    }
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
        console.log(res.data.msg)
        alert(`${res.data.msg}`)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })
  }
  const ModifyHandler = async (commentId: any) => {
    console.log(commentId)
    if (window.confirm('수정하시겠습니까?')) {
    }
  }
  const DeleteHandler = async (commentId: any) => {
    console.log(commentId)
    if (window.confirm('삭제하시겠습니까?')) {
      await axios
        .delete(`/api/recipe/comment/${commentId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data)
          alert('삭제완료')
          window.location.reload()
        })
    }
  }

  useEffect(() => {
    axios
      .get(`/api/recipe/${params?.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
  }, [])
  return (
    <CenterWrapperDetail>
      {userInfo && userInfo ? (
        <>
          {/* <h1 style={{ fontSize: '30px', marginBottom: '10px' }}>
        {prams.id} deatail page
      </h1> */}
          <ContentsWrap>
            <div style={{ width: '400px' }}>
              {isData && isData ? (
                <Carousel
                  autoplay
                  wrapAround
                  cellAlign={'center'}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <button onClick={previousSlide}>
                      <i className="fa fa-arrow-left" />
                    </button>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <button onClick={nextSlide}>
                      <i className="fa fa-arrow-right" />
                    </button>
                  )}
                >
                  {isData &&
                    isData?.image.map((item: any, idx: any) => (
                      <div key={idx}>
                        <Img
                          src={item?.image}
                          width={400}
                          height={400}
                          alt={idx}
                        />
                      </div>
                    ))}
                </Carousel>
              ) : null}
            </div>
            <ContentsWrapIn>
              <ContentTopName>{isData?.title}</ContentTopName>
              <div>
                <ContentName>
                  {isData?.mbti} ({isData?.material}) / {isData?.nickname}
                </ContentName>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    fontSize: '20px',
                    fontFamily: 'KCC-DodamdodamR',
                  }}
                >
                  <span>Like</span>
                  <span
                    style={{
                      width: '20px',
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                    onClick={LikeHandlerBtn}
                  >
                    {isHearts ? <>♡</> : <>♥</>}
                  </span>{' '}
                  :{'  '}
                  {isData.recipeLike}
                </div>

                <div
                  style={{
                    borderTop: '1px solid #e0e0e0',
                    padding: '20px 0px',
                    fontSize: '20px',
                    fontFamily: 'KCC-DodamdodamR',
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
                marginBottom: '20 px',
                paddingBottom: '8px',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              Comments ({isData?.comments?.length})
            </CommnetsInner>
            {isData &&
              isData?.comments?.map((el: any) => {
                return (
                  <Comment key={el.id}>
                    {el.user}님
                    <span style={{ width: '25px', display: 'inline-block' }}>
                      <ChatBox />
                    </span>
                    : {el.comments}
                    <span
                      style={{
                        marginLeft: '10px',
                        width: '20px',
                        display: 'inline-block',
                        cursor: 'pointer',
                      }}
                      onClick={() => DeleteHandler(el.id)}
                    >
                      <Xmark />
                    </span>
                    {/* <span
                  style={{
                    marginLeft: '3px',
                    width: '15px',
                    display: 'inline-block',
                    cursor: 'pointer',
                  }}
                  onClick={() => ModifyHandler(el.id)}
                >
                  {el.user == userInfo.sub ? <Modify /> : <>nomodify</>}
                </span> */}
                  </Comment>
                )
              })}
            <div style={{ display: 'flex', gap: '8px', marginTop: '30px' }}>
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
        </>
      ) : (
        <>{navigate('/detail/:id')}</>
      )}
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
  font-family: 'KCC-DodamdodamR';
  margin: 20px 0px;
  font-size: 20px;
`
const ContentTopName = styled(ContentName)`
  font-family: 'KCC-DodamdodamR';
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
  font-family: 'KCC-DodamdodamR';
  padding: 10px;
  display: flex;
  align-items: center;
`
export default Detail
