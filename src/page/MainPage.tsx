import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AutoModal from '../components/AutoModal'
import { Pagination } from '@mantine/core'
import { TAKE } from '../constants/products/products'
function MainPage() {
  const [isAutoModal, setAutoModal] = useState<boolean>(false)

  const [activePage, setPage] = useState(1)
  const [isNum, setNum] = useState<any>(null)
  const [total, setTotal] = useState<number>(0)
  const [products, setProducts] = useState<any>([])
  const onClickModal = (el: number) => {
    setAutoModal(true)
    setNum(el)
  }
  useEffect(() => {
    const skip = TAKE * (activePage - 1)
    let data = [
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3,
      4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6,
      7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6, 7, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 19, 20,
    ].slice(skip, skip + TAKE)
    setProducts(data)
  }, [activePage])

  useEffect(() => {
    let data = [
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3,
      4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6,
      7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6, 7, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 19, 20, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 19, 20,
    ]
    setTotal(Math.ceil(data?.length / TAKE))
  }, [])
  return (
    <div style={{ marginTop: '150px' }}>
      <CotentWrap>
        {products &&
          products?.map((el: number, idx: number) => {
            return (
              <ElementBox key={idx} onClick={() => onClickModal(el)}>
                <Img
                  src="https://lesprit.kr/img_goods/1535021786.jpg"
                  alt={`주류 ${el}`}
                />
                <div>술이름 {el}</div>
              </ElementBox>
            )
          })}
        {isAutoModal && <AutoModal closeModal={setAutoModal} el={isNum} />}
      </CotentWrap>
      <div
        style={{
          marginTop: '5px',
          width: '100%',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination page={activePage} onChange={setPage} total={total} />
      </div>
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
