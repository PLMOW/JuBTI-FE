import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AutoModal from '../components/AutoModal'
import { Pagination } from '@mantine/core'
import { TAKE } from '../constants/products/products'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Login'
import { getUser } from '../util/localstorage'
import { useSelector } from 'react-redux'
import CreateBox from '../asset/svg/CreateBox'
import axios from 'axios'

function MainPage() {
  const location = useLocation()
  const userInfo = getUser()
  const [isAutoModal, setAutoModal] = useState<boolean>(true)
  const [activePage, setPage] = useState(1)
  const [isNum, setNum] = useState<any>(null)
  const [total, setTotal] = useState<number>(0)
  const [products, setProducts] = useState<any>([])

  const login = useSelector((state: any) => {
    return state.login.login
  })
  console.log('login :', login)

  const onClickModal = () => {
    setAutoModal(true)
    // setNum(el)
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
  const fetchHandler = async () => {
    axios.get('/api/recipe')
    const res = await axios
      .get(`http://3.36.29.101/api/recipe`)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchHandler()
  }, [])
  return (
    <div style={{ marginTop: '150px' }}>
      <CotentWrap>
        <ButtonWrap>
          <Button
            width="150px"
            fontWeight="600"
            bgColor="#000"
            border="3px solid #fff"
            color="white"
            height="50px"
            onClick={() => onClickModal()}
          >
            내Mbti확인하기
          </Button>
        </ButtonWrap>
        {products &&
          products?.map((el: number, idx: number) => {
            return (
              <ElementBox key={idx}>
                <Link to={`/detail/${el}`} state={el}>
                  <Img
                    src="https://lesprit.kr/img_goods/1535021786.jpg"
                    alt={`주류 ${el}`}
                  />
                  <div>술이름 {el}</div>
                </Link>
              </ElementBox>
            )
          })}
        {userInfo && isAutoModal && (
          <AutoModal closeModal={setAutoModal} el={isNum} />
        )}
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
      <CreateBoxWrap style={{ width: '70px', display: 'block' }}>
        <Link to="/createform">{<CreateBox />}</Link>
      </CreateBoxWrap>
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
  width: 948px;
  margin: 0 auto;
  height: auto;
`
const ButtonWrap = styled.div`
  margin-bottom: 60px;
  display: flex;
  justify-content: end;
`
const ElementBox = styled.div`
  overflow: hidden;
  display: inline-block;
  margin-right: 33.33px;
  &:nth-of-type(4n + 1) {
    margin-right: inherit;
  }
`
const CreateBoxWrap = styled.div`
  position: fixed;
  bottom: 100px;
  right: 50px;
  z-index: 99;
  cursor: pointer;
`
export default MainPage
