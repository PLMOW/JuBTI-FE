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
import Heart from '../asset/svg/Heart'
import { getCookie } from '../util/cookie'

function MainPage() {
  const userInfo = getUser()
  const [isAutoModal, setAutoModal] = useState<boolean>(false)
  const [activePage, setPage] = useState(1)
  const [isMbti, setMbti] = useState<any>(null)
  const [total, setTotal] = useState<number>(0)
  const [isProducts, setProducts] = useState<any>([])
  const userMbti = localStorage.getItem('userMbti')
  let token = getCookie('accessToken')
  const onClickModal = () => {
    setAutoModal(true)
    // setNum(el)
  }
  useEffect(() => {
    const skip = TAKE * (activePage - 1)
    axios
      // .get(`http://3.36.29.101/api/recipe`, {
      .get(`http://3.36.29.101/api/recipe/${skip + 1}/${skip + TAKE}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        setProducts(res.data)
      })
    // .slice(skip, skip + TAKE)
  }, [activePage])

  useEffect(() => {
    axios.get(`http://3.36.29.101/api/recipe`, {}).then((res) => {
      setTotal(Math.ceil(res.data?.length / TAKE))
    })
  }, [isProducts])
  const login = useSelector((state: any) => {
    return state?.login?.login
  })
  return (
    <div style={{ marginTop: '30px' }}>
      <CotentWrap>
        <ButtonWrap>
          {userInfo && userInfo ? (
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
          ) : null}
        </ButtonWrap>
        {isProducts &&
          isProducts?.map((el: any, idx: number) => {
            return (
              <ElementBox key={el.id}>
                <Link to={`/detail/${el.id}`} state={el.id}>
                  <Img src={el.image[0].image} alt={`주류 ${el.id}`} />
                  <div
                    style={{
                      margin: '20px 0px',
                      fontWeight: 'bold',
                    }}
                  >
                    {el.mbti}
                  </div>
                  <div style={{ whiteSpace: 'nowrap' }}>{el.title}</div>
                  <div>{el.nickname}</div>
                  <div style={{ display: 'flex', margin: '10px 0px' }}>
                    <span
                      style={{
                        width: '20px',
                        display: 'flex',
                        fontSize: '17px',
                      }}
                    >
                      {/* <Heart /> */}❤
                    </span>
                    {el.recipeLike}
                  </div>
                </Link>
              </ElementBox>
            )
          })}
        {login && login[0]?.login === true ? (
          <AutoModal closeModal={setAutoModal} mbti={userMbti} />
        ) : null}

        {userInfo && isAutoModal && (
          <AutoModal closeModal={setAutoModal} mbti={userMbti} />
        )}
      </CotentWrap>
      <div
        style={{
          marginTop: '5px',
          width: '100%',
          height: '100px',
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
  width: 1030px;
  margin: 0 auto;
  height: auto;
`
const ButtonWrap = styled.div`
  margin-bottom: 60px;
  display: flex;
  justify-content: end;
`
const ElementBox = styled.div`
  width: 240px;
  overflow: hidden;
  display: inline-block;
  margin-right: 22.33px;
  padding: 10px 0px;
  font-size: 20px;
  font-family: 'KCC-DodamdodamR';
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
