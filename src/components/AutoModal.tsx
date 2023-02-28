import React, { useRef } from 'react'
import styled from 'styled-components'
import Xbox from '../asset/svg/Xbox'
import useDetectClose from '../hook/useDetectClose'
const AutoModal = (props: any) => {
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false) //커스텀훅
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}>
          <span style={{ width: '40px' }}>{<Xbox />}</span>
        </XboxWrap>
        <div style={{ fontSize: '30px' }}>{props.el}</div>
        <ImageWrap>
          <div>
            <img
              src="https://lesprit.kr/img_goods/1535021786.jpg"
              alt="주류 4"
              style={{ width: '250px', height: '250px', objectFit: 'cover' }}
            ></img>
          </div>
          <BoxMent>축하합니다 당신은 *** 주류입니다.</BoxMent>
          <BoxMentContent>
            주정의 생산부터 숙성에 이르기까지 전통적인 방식을 고수하고 있어
            전통적인 느낌을 주는 위스키이다. 셰리 오크통을 사용하는 더 맥켈란과
            달리 버번 캐스크 원액을 주로 사용하여 화려한 오크향이 특징이다. 싱글
            몰트 위스키 특유의 강하고 쏘는 듯한 맛을 지니고 있는 위스키지만,
            부드러운 느낌 또한 가지고 있어 상당히 대중적인 싱글 몰트 위스키이다.
          </BoxMentContent>
        </ImageWrap>
        <div>
          <div style={{ textAlign: 'right' }}>
            <Button
              width="100px"
              height="40px"
              bgColor="#fff"
              border="3px solid #000"
              color="#000"
              onClick={() => props.closeModal(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      </ModalBlock>
    </Container>
  )
}
const XboxWrap = styled.span`
  cursor: pointer;
  position: absolute;
  z-index: 99;
  right: 28px;
  width: 35px;
`
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
`
const ModalBlock = styled.div<{ ref?: any }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 6.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  color: black;
  width: 800px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 1px 1px gray;
  justify-content: space-between;
`
const Button = styled.button<{
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
  width: ${(props) => (props.width ? props.width : '110px')};
  &:active {
    filter: brightness(50%);
  }
`
const BoxMent = styled.div`
  margin: 35px 0 40px;
  font-size: 23px;
  font-family: 'Pretendard-Black';
`
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const BoxMentContent = styled.div`
  line-height: 1.3rem;
`
export default AutoModal
