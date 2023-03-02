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
      title: ' 해창 막걸리 입니다. 😵‍💫',
      content:
        ' ISTJ는 디테일을 중요시하면서 판단이 빠르고 계획적인 관리자 타입입니다. 그래서 술 자체를 안 좋아하는 사람들도 많습니다. 혹은 한번 마실때 확실하게 풀어져서 마시게 됩니다. 이 술은 굉장히 많은 쌀이 들어갑니다. 이 쌀을 거의 100일동안 빚어서 만든 술이기에 ISTJ와 어울린다고 볼 수 있습니다. 막걸리면서도 달콤하고, 도수가 12도여서 마시는 동안에는 완벽주의적인 성향을 조금 내려놓을 수 있을 겁니다.  ',
      imgUrl:
        'https://wimg.mk.co.kr/meet/neds/2021/02/image_readtop_2021_126666_16126960744533937.jpg',
    },
    {
      id: '2',
      mbti: 'ISTP',
      title: ' 옐로우 테일 쉬라즈 입니다. 😵‍💫',
      content:
        '어른이면서 아이 같은 순수함을 늘 지니고 있는 ISTP는 봄바람같이 시원하고 청량한 고양이를 닮은 듯 하지만 사실은 강아지 같은 여리고 착한 마음을 지닌 유형입니다. 새로운 것에 관심이 많고 때때로 명석함을 보여주는 탐험가 유형인 당신에게 추천하는 `옐로우 테일 쉬라즈` 입니다. 호주의 레드와인이고, 당도가 거의 없으며 약간의 산미를 지니고 있습니다. 육류와의 페어링도 좋은편이며 딸기류의 아로마와 스파이시 향이 특징인 이 제품은 풀 바디로 묵직한 균형이 있으며 긴 여운을 줍니다. ',
      imgUrl:
        'https://www.vamosorder.co.kr/data/item/ETC/thumb-etc_2022060461_600x600.jpg',
    },
    {
      id: '3',
      mbti: 'INFJ',
      title: ' 블루 문 입니다. 😵‍💫',
      content:
        '선의의 옹호자 라고도 불리는 INFJ는 이상주의적이고 원칙주의적인 성격으로, 삶에 순응하는 대신 삶에 맞서 변화를 만들어 내고자 합니다. 외압이나 스트레스로부터 상당히 자유로운 유형이기도 한 INFJ에게는 쓴맛은 거의 느껴지지 않으면서 가벼운 과일 향의 에일을 추천드립니다. 창의적이며 항상 미소를 보이고 자유롭게 사람들과 거리낌 없이 어울리는 이들의 에너지에 상큼한 과일 향이 나는 에일은 부스터 역활을 해줄겁니다. ',
      imgUrl:
        'https://cdn.clien.net/web/api/file/F01/8379734/f97bcde30d4a8.jpg?w=850&h=30000',
    },
    {
      id: '4',
      mbti: 'INTJ',
      title: ' 세븐 브로이 인디아 페일 에일 생맥주 입니다. 😵‍💫',
      content:
        '용의주도한 전략가 라고 불리는 INTJ는 직설적이며 논리적이고 무엇이든 기승전결, 분석하여 이끌어내는 유형입니다. 누군가에겐 너무나도 솔직해 상처를 줄 수도 있지만 도전을 두려워하지 않는 이들의 모습이 마치 쓴맛 때문에 처음엔 호출호가 갈리지만 한번 빠지면 그 매력에서 헤어 나오지 못하는  에일맥주 중에서도 쌉싸름함이 매력적인 IPA 를 추천드립니다.',
      imgUrl:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzAxMTNfMjMw/MDAxNDg0MjU1NjU3Mjkz.lWgOEqFTcWhdgnqJFPeM1r4ti4rx_siZkOuaVh4zy14g.lyJm_N3hD41OMUPIuZtpPIeJ9_veTvvY0oRfl5bKSbIg.PNG.berryhill626/%EC%84%B8%EB%B8%90%EB%B8%8C%EB%A1%9C%EC%9D%B4%EC%9D%B8%EB%94%94%EC%95%84%ED%8E%98%EC%9D%BC%EC%97%90%EC%9D%BC.PNG?type=w800',
    },
    {
      id: '5',
      mbti: 'ISFJ',
      title: ' 조니 워커 블루라벨 입니다. 😵‍💫',
      content:
        'ISFJ는 수호자 라고도합니다. 법을 수호하고 차분하고 헌신적인 유형이기에 전통의 가치를 소중히 여깁니다. `위스키`는 기본적으로 굉장히 전통이 깊고, 마시기만해도 그 깊이가 딱 느껴지는 술입니다. 몰트위스키보단 블렌드 위스키를 더 추천드리는데, 그 자체로 완전한 어떤 균형미를 주기에 마음의 안정감을 줄 수 있습니다. ',
      imgUrl: 'https://img.hankyung.com/photo/202204/01.29527693.1.png',
    },
    {
      id: '6',
      mbti: 'ISFP',
      title: ' 지란지교 입니다. 😵‍💫',
      content:
        ' 새로운 디테일들을 탐험하고 즐기면서 중요시하면서도 그대로 받아들이는 유형인 ISFP는 호기심 많은 예술가 혹은 성인 군자라고합니다. 전통적이고 완벽함을 추구하며 새로운 것에 호기심이 가득한 유형인데요, 이 술 `지란지교` 를 추천드립니다. 신맛이 많이 나고, 과일향 같은게 엄청 쏟아지듯이 납니다. 인위적인 단맛이 아닌 자연스러운 단맛이 오래 남습니다.',
      imgUrl:
        'https://d38cxpfv0ljg7q.cloudfront.net/content_images/contents_images-1633670302020-%EC%A7%80%EB%9E%80%EC%A7%80%EA%B5%90+%ED%83%81%EC%A3%BC5.jpg',
    },
    {
      id: '7',
      mbti: 'INFP',
      title: ' 제주 오메기술 입니다. 😵‍💫',
      content:
        'INFP 이상적이고 공상적인 경향들이 있으며, 감수성이 예민하기에 쉽게 상처를 받을수 있는 타입입니다. 그래서 위로가 필요한 술을 추천드립니다. 이 술은 달콤하고 상큼하면서도 굉장히 따뜻한 느낌입니다. 아무리 차갑게 마셔도 따뜻하게 마음을 적셔주는 느낌이 있어서 큰 위로가 될것입니다.',
      imgUrl:
        'https://s3.ap-northeast-2.amazonaws.com/meesig/v3/prod/image/item/content/600/098ea9d59fbe45cbba28702e7f94340820210630111914.png',
    },
    {
      id: '8',
      mbti: 'INTP',
      title: '도멘 라파주 나라사 입니다. 😵‍💫',
      content:
        '직관과 사고가 발달한 유형 입니다. 사실에 근거한 탐구와 실험에 흥미를 느끼고 선호하는 특징을 가진 INTP 에게는 `도멘 라파주 나라사` 를 추천합니다. 블랙베리, 블랙체리의 검은 과실 아로마를 기반으로 다양한 허브, 후추 등의 여러 가지 뉘양스를 찾아가는 재미를 느낌 수 있습니다. 또한 부드러운 타닌이 매력적이고 풀바디의 미감으로 리파소(Ripasso)스타일의 과실 달큰함이 긴 피니쉬로 이어져 고긊스러움에 큰 만족감을 느낄 수 있습니다.',
      imgUrl:
        'https://cdn-pro-web-151-224.cdn-nhncommerce.com/tigerwine_godomall_com/data/goods/18/08/34/1000000026/1000000026_detail_230.jpg',
    },
    {
      id: '9',
      mbti: 'ESTJ',
      title: ' 샤토 디쌍 입니다. 😵‍💫',
      content:
        'ESTJ는 진짜 무서운 유형입니다. 디테일이 꼼꼼하면서도, 상황을 감정적으로 봐주는것들 없이 이성적인 판단에 해박하며 계획적인 유형인데요, 이 분들에게 어울리는 술은 `보르도 와인` 입니다. 수많은 사람들이 수많은 요소들에 아주 디테일까지 생각을 해서 그사람들이 생각하는 가장 완벽한 맛을 만들어낸 술입니다.  ',
      imgUrl:
        'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTFfNDkg/MDAxNTg5MjA3ODMyNzI4.hXFIuxJ7-_KXHEjg3r6SXpkBRhVjwm0Ohk2kpGM0OKUg.DRKPGj4IPaKUweajFDlpyMwzjcWboFBe1eDZSYIoLvEg.JPEG.kiha16/20200510_175540.jpg?type=w2',
    },
    {
      id: '10',
      mbti: 'ESFP',
      title: ' 꾸베 데오르 스푸만테 입니다. 😵‍💫',
      content:
        'ESFP는 디테일을 중요시하고 감정적이면서도 오는것을 마다하지않는 매우 친화적인 슈퍼스타 유형입니다. 그냥 어울리고 즐겁게 노는 걸 너무 좋아하는 사람들을 위해 추천하는 술은 `스푸만테` 입니다. 파티형 술로써 인기가 굉장히 많습니다. 드라이 하면서도 산뜻하고 화려한 향과 맛을 내는 술입니다. 함께 어울리는데는 샴페인도 좋지만, 좀 더 격식을 차리지 않고 자유로운 느낌의 이 술을 추천합니다.',
      imgUrl:
        'https://www.vinello.eu/media/image/a3/10/14/cuvee-deor-gold-collection-cielo-e-terra_600x600.webp',
    },
    {
      id: '11',
      mbti: 'ENFP',
      title: ' 복순도가 손 막걸리 입니다. 😵‍💫',
      content:
        'ENFP는 사람들과 어울리는것을 좋아하고, 좋은 관계를 중요시하는 유형입니다. `스파크형` 이라고도 합니다. 이 술은 신맛과 단맛이 강하고 탄산도 강합니다. 싫어하는 사람이 없는 술이면서도 여기에 말할 거리와 깊이가 있습니다. ',
      imgUrl:
        'https://d38cxpfv0ljg7q.cloudfront.net/content_images/contents_images-1655692314810-1.jpg',
    },
    {
      id: '12',
      mbti: 'ENTP',
      title: '산테로 피노 샤르도네 스푸만테 입니다. 😵‍💫',
      content:
        '뜨거운 논쟁을 즐기는 변론가 유형인 ENTP는 지식이 풍부하고 호기심이 넘치며 활기찬 유머 감각으로 다른 사람을 즐겁게 할 수 있는 성격입니다. 자신의 주장을 말하는 데 어려움이 없고 올곧은 성격이 남들에게는 매력적으로 비칠수 있습니다. 상큼하면서도 톡톡 튀는 분석형인 당신에게 과일향 스파클링 와인을 추천드립니다. 상큼하고 신선한 과일 향이 특징이며 단맛이 없는 깔끔하고 상쾌한 청량감이 특징이며 버블이 풍부한 스파클링 와인입니다. ',
      imgUrl:
        'https://www.vamosorder.co.kr/data/item/ETC/thumb-etc_2022061794_600x600.jpg',
    },
    {
      id: '13',
      mbti: 'ESFJ',
      title: ' 오미로제 결 입니다. 😵‍💫',
      content:
        'ESFJ는 디테일에 충실하고 남의 감정을 잘 이해하며 계획적인, `사교적인 외교관` 이라고도 합니다. 이 술은 파티에 되게 어울리면서 화려한 샴페인입니다. 오미자를 가지고 이런 술을 만들려면 굉장히 많은 디테일과 계획적인 면들이 필요합니다. 대통령들의 만찬주로도 유명한만큼 사람들과의 마음을 터놓게 하는 기능이 특출납니다. ',
      imgUrl:
        'https://soolfarm.co.kr/web/product/extra/big/201911/332efcb8f662cdd9af0a2bcb12d01663.jpg',
    },
    {
      id: '14',
      mbti: 'ESTP',
      title: '버드와이저 입니다. 😵‍💫',
      content:
        '모험을 즐기는 사업가 유형인 ESTP는 직설적이면서도 친근한 농담으로 주변 사람을 웃게 만드는 이들은 주변의 이목을 끄는 것을 좋아합니다. 긴 설명을 싫어하고 운동, 음식 등 오감으로 보고 만질 수 있는 삶의 모든 것을 즐기는 유형이기에 아무 맛에도 방해받지 않는 깨끗하고, 시원함과 깊은 곡물 맛이 특징인 흑맥주와 라거를 추천드립니다.   ',
      imgUrl:
        'https://i1.sndcdn.com/artworks-iZ9Q81emyq57pOJe-26whaA-t500x500.jpg',
    },
    {
      id: '15',
      mbti: 'ENFJ',
      title: '데스페라도스 입니다. 😵‍💫',
      content:
        'ENFJ 특징은 따뜻하고 적극적이며 책임감이 강하고 사교성이 풍부하고 동정심이 많습니다. 상당히 이타적이고 민첩하고 인화를 중요시하며 참을성이 많으며, 다른 사람들의 생각이나 의견에 진지한 관심을 가지고 공동선을 위하여 다른 사람의 의견에 대체로 동의합니다. 이 유형은 외압이나 스트레스로부터 상당히 자유롭기에 가벼운 과일 향의 에일을 추천합니다. ',
      imgUrl:
        'https://p.turbosquid.com/ts-thumb/Ce/iklSPr/hw/pic_0000/jpg/1642976688/1920x1080/fit_q99/a4a7500743b48281928453e5ac7a4ba3f8c1db61/pic_0000.jpg',
    },
    {
      id: '16',
      mbti: 'ENTJ',
      title: '다인하드 그린 라벨 입니다. 😵‍💫',
      content:
        '대담한 통솔자 유형인 ENTJ는 카리스마와 자신감을 지니고 있으며 자신의 권한을 이용해 사람들이 공통된 목표를 위해 함께 노력하도록 이끕니다. 자신이 원하는 것을 성취하기 위해 열정과 결단력과 날카로운 지적 능력을 활용합니다. 이런 당신에게 `다인하드 그린 라벨`을 추천드립니다. 리슬링 100%의 와인으로 독일에서 생산되는 이 와인은 당도가 있는 편입니다. 늘 생각이 깊은 분석가인 당신에게 가볍지만 깔끔한 `다인하드 그린 라벨`으로 머리를 식혀보시죠. ',
      imgUrl:
        'https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/1e7G/image/_iWicy0xbxu3nXqNdUYiZLXXQjc.jpg',
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
  font-weight: bold;
  font-size: 26px;
  font-family: 'KCC-DodamdodamR';
`
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const BoxMentContent = styled.div`
  line-height: 1.5rem;
  font-family: 'KCC-DodamdodamR';
  font-size: 1.3rem;
`
export default AutoModal
