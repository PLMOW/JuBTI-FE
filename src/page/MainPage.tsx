import React, { useState } from 'react'
import styled from 'styled-components'
import AutoModal from '../components/AutoModal'
import { CenterWrapper } from './Login'

function MainPage() {
  const [isAutoModal, setAutoModal] = useState<boolean>(false)

  return (
    <div style={{ marginTop: '150px' }}>
      <CotentWrap>
        {[
          1, 2, 3, 4, 5, 6, 7, 9, 10, 1, 2, 3, 4, 5, 6, 7, 9, 10, 1, 2, 3, 4, 5,
          6, 7, 9, 10, 1, 2, 3, 4, 5, 6, 7, 9, 10, 1, 2, 3, 4, 5, 6, 7, 9, 10,
          1, 2, 3, 4, 5, 6, 7, 9, 10, 1, 2, 3, 4, 5, 6, 7, 9, 10,
        ].map((el: number, idx: number) => {
          return (
            <ElementBox key={idx} onClick={() => setAutoModal(true)}>
              <Img
                src="https://lesprit.kr/img_goods/1535021786.jpg"
                alt={`주류 ${idx}`}
              />
              <div>술이름</div>
            </ElementBox>
          )
        })}
        {isAutoModal && <AutoModal closeModal={setAutoModal} />}
      </CotentWrap>
    </div>
  )
}
const Img = styled.img`
  width: 212px;
  border-radius: 15px;
  height: 212px;
  object-fit: cover;
`
const CotentWrap = styled.div`
  width: 1000px;
  margin: 0 auto;
  height: auto;
`
const ElementBox = styled.div`
  overflow: hidden;
  display: inline-block;
  margin-right: 33.33px;
`
export default MainPage
