import React, { useRef } from 'react'
import styled from 'styled-components'
import Xbox from '../asset/svg/Xbox'
import useDetectClose from '../hook/useDetectClose'
const AutoModal = (props: any) => {
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false) //커스텀훅

  const MappingData = [
    {
      id: '1',
      mbti: 'ISTJ',
      title: ' 도라지 위스키입니다. 😵‍💫',
      content:
        '6.25 전쟁 이후 한국에 주둔하던 미군들을 통해 우리 나라에 위스키가 처음 소개되는데, 이 때 미군부대 PX 등을 통해 소량이나마 위스키가 외부로 흘러나오기는 했지만 대중들이 마시기에는 너무 비싸서 주로 상류층들을 중심으로 소량 유통되는 정도였다. 이름은 위스키이지만, 실제 위스키 원액은 단 한 방울도 들어있지 않았다. 말 그대로 물과 주정에 일본에서 수입한 위스키향과 식용색소를 첨가하여 만든 소위 "대중 양주"로, 이를테면 지금의 캪틴큐와 비슷한 술이었다. ',
      imgUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAyMTdfMjcw%2FMDAxNjQ1MDI0NzExMzcy.bKRX5U4xiYqZZyvJ-183JXP5GbSC6nLuhYi2uT_LV_Ug.-oqUpDKN25F0Ms3M6qmxnYSxM2ZXwAHhCM9KyemvTikg.JPEG.vihloe%2F38.jpg&type=sc960_832',
    },
    {
      id: '2',
      mbti: 'ISTP',
      title: 'ISTP의 술입니다.',
      content: 'ISTP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '3',
      mbti: 'INFJ',
      title: 'INFJ의 술입니다.',
      content: 'INFJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '4',
      mbti: 'INTJ',
      title: 'INTJ의 술입니다.',
      content: 'INTJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '5',
      mbti: 'ISFJ',
      title: 'ISFJ의 술입니다.',
      content: 'ISFJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '6',
      mbti: 'ISFP',
      title: 'ISFP의 술입니다.',
      content: 'ISFP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '7',
      mbti: 'INFP',
      title: 'INFP의 술입니다.',
      content: 'INFP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '8',
      mbti: 'INTP',
      title: 'INTP의 술입니다.',
      content: 'INTP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '9',
      mbti: 'ESTJ',
      title: 'ESTJ의 술입니다.',
      content: 'ESTJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '10',
      mbti: 'ESFP',
      title: 'ESFP의 술입니다.',
      content: 'ESFP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '11',
      mbti: 'ENFP',
      title: 'ENFP의 술입니다.',
      content: 'ENFP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '12',
      mbti: 'ENTP',
      title: 'ENTP의 술입니다.',
      content: 'ENTP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '13',
      mbti: 'ESFJ',
      title: 'ESFJ의 술입니다.',
      content: 'ESFJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '14',
      mbti: 'ESTP',
      title: 'ESTP의 술입니다.',
      content: 'ESTP의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '15',
      mbti: 'ENFJ',
      title: 'ENFJ의 술입니다.',
      content: 'ENFJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
    {
      id: '16',
      mbti: 'ENTJ',
      title: 'ENTJ의 술입니다.',
      content: 'ENTJ의 잘어울리는 술내용입니다.',
      imgUrl: '',
    },
  ]
  return (
    <Container>
      <Background
        onClick={() => setIsOpen(() => props.closeModal(false))}
      ></Background>
      <ModalBlock ref={dropDownRef}>
        <XboxWrap onClick={() => props.closeModal(false)}>
          <span style={{ width: '40px' }}>{<Xbox />}</span>
        </XboxWrap>
        <div></div>
        {MappingData.map((el) => {
          if (el.mbti === props.mbti) {
            return (
              <>
                <ImageWrap>
                  <div key={el.id}>
                    <img
                      src={el.imgUrl}
                      alt={el.id}
                      style={{
                        width: '250px',
                        height: '250px',
                        objectFit: 'contain',
                      }}
                    ></img>
                  </div>
                  <BoxMent>🎉 축하합니다! 당신은 {el.title}</BoxMent>
                  <BoxMentContent>{el.content}</BoxMentContent>
                </ImageWrap>
              </>
            )
          }
        })}

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
