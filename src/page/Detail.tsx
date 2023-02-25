import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function Detail() {
  const prams = useParams()
  console.log('prams :', prams)
  return (
    <CenterWrapperDetail>
      {/* <h1 style={{ fontSize: '30px', marginBottom: '10px' }}>
        {prams.id} deatail page
      </h1> */}
      <ContentsWrap>
        <div>
          <Img src="https://lesprit.kr/img_goods/1535021786.jpg" alt="" />
        </div>
        <ContentsWrapIn>
          <ContentTopName>글렌피딕 18년산</ContentTopName>
          <div>
            <ContentName>ENFP / 김영현</ContentName>
            <div
              style={{ borderTop: '1px solid #e0e0e0', padding: '20px 0px' }}
            >
              막걸리1사발 꿀 한큰술 둘이 섞은 다음 부어라 마신다.
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
          Comments
        </CommnetsInner>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((el: number) => {
          return <div>{el}</div>
        })}
      </CommnetsWrap>
    </CenterWrapperDetail>
  )
}
const CenterWrapperDetail = styled.div`
  width: 700px;
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
  margin-top: 150px;
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
  font-family: 'Pretendard-Black';
  font-weight: bold;
  margin: 20px 0px;
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
export default Detail
