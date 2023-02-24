import React, { useRef } from 'react'
import styled from 'styled-components'
import Xbox from '../asset/svg/Xbox'
import useDetectClose from '../hook/useDetectClose'
const AutoModal = (props: any) => {
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false) //커스텀훅
  console.log(props)
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}>
          <div style={{ width: '40px' }}>{<Xbox />}</div>
        </XboxWrap>
        <div style={{ fontSize: '30px' }}>{props.el}번째아이템</div>
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
const XboxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
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
  background-color: rgb(221, 221, 221);
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
export default AutoModal
