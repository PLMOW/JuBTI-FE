import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function CreateForm() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    Image: '',
    Title: '',
    Mbti: '',
    Material: '',
    Content: '',
  });

  const onClickHandler = (e: any) => {
    e.preventDefault();

    if (
      data.Image.trim() === '' ||
      data.Title.trim() === '' ||
      data.Mbti.trim() === '' ||
      data.Material.trim() === '' ||
      data.Content.trim() === ''
    ) {
      return alert('모든 항목을 입력해주세요.');
    }

    // axios 활용 서버에 전송하기
    axios
    .post(
      ``,
       {
      Image: data.Image,
      Title: data.Title,
      Mbti: data.Mbti,
      Material: data.Material,
      Content: data.Content,
    })
    .then((res) => {
      if (res.data.success) {
        alert('레시피가 작성되었습니다.');
        navigate('/detail/:id');
      } else {
        alert('작성에 실패하였습니다.');
        navigate('/CreateForm');
      }
    })
    .catch((err) => {
      alert('작성에 실패하였습니다.');
      navigate('/CreateForm');
    });



    // 데이터 내용 초기화
    setData({
      Image: '',
      Title: '',
      Mbti: '',
      Material: '',
      Content: '',
    });

  }

  const changhandler = (e : any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // // 사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
    // // 엔터('\n') 개수를 세서 textareaHeight에 저장
    // setTextareaHeight(e.target.value.split('\n').length - 1);
    // setCheckItemContent(e.target.value);
  };

  // // ContentTextarea 컨텐츠 확장기능
  // // 유저 입력 값을 넣을 변수
  // const [checkItemContent, setCheckItemContent] = useState('');
  // // 줄 수를 계산해서 저장할 변수
  // const [textareaHeight, setTextareaHeight] = useState(0);


  return (
    <CreateWrapper>
      <Forms onSubmit={onClickHandler}>
        <ImgForm>
          <Img type="File" />
        </ImgForm>
        <CreateFormWrapIn>
          <TitleForm>
            <InputBox 
              type="text"
              name="Title"
              onChange={changhandler}
              placeholder="제목을 적어주세요!" 
            />
          </TitleForm>
          <MbtiForm>
            <InputBox 
              type="text"
              name="Mbit"
              onChange={changhandler}
              placeholder="mbti를 적어주세요!"
            />
          </MbtiForm>
          <MaterialForm name='Material' onChange={changhandler} >
            <option value="" hidden>
              주 재료를골라주세요!
            </option>
            <option value="1">사케</option>
            <option value="2">와인</option>
            <option value="3">위스키</option>
            <option value="4">막걸리</option>
          </MaterialForm>
        </CreateFormWrapIn>
        <ContentForm>
          <ContentTextarea 
            name='Content'
            // value={checkItemContent}
            placeholder="당신의 레시피를 적어주세요!"
            onChange={changhandler}
            // style={{height: ((textareaHeight + 2) * 18) + 'px'}}   
          />
        </ContentForm>
        <SaveButtonContainer>
          <Button
            bgColor="#000"
            border="3px solid #fff"
            color="white"
          >
            저장
          </Button>
          <Button
            bgColor="#fff"
            border="3px solid black"
            onClick={() => {
              navigate('/mainpage');
            }}
          >
            취소
          </Button>
        </SaveButtonContainer>
      </Forms>
    </CreateWrapper>
  )  
}

const CreateWrapper = styled.div`
  width: 1200px;
  height: auto;
  margin: 150px auto;
  font-family: 'Pretendard-Black';
  font-weight: bold;
  display: flex;
  justify-content: center;
`
const ImgForm = styled.div`
  background-color: darkseagreen
`
const Img = styled.input`
  width: 400px;
  height: 400px;
  object-fit: cover;
`
const Forms = styled.div`
  align-items: center;
  gap: 50px;
  justify-content: center;
  display: grid;
	grid-template-columns: repeat(2, 1fr);
`
const CreateFormWrapIn = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 400px;
`
const TitleForm = styled.div`
  overflow: hidden;
  margin-bottom: 57px;
  font-size: 35px;
  font-weight: 800;
  color: #222222;
  line-height: 36px;
  word-break: break-all;
  margin: 20px 0px;
`
const InputBox = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid #000;
  padding-left: 15px;
  height: 50px;
  font-size: 20px;
`
const MbtiForm = styled.div`
  margin: 20px 0px;
`
const MaterialForm = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin: 20px 5px;
`
const ContentForm = styled.div`
  border-Top: 1px solid #e0e0e0;
  padding: 20px 0px;
  font-family: none;
  font-weight: initial;
  display: grid;
	grid-column-end: span 2;
`
const ContentTextarea = styled.textarea`
  width: 100%;
  border: none;
  border-bottom: 2px solid #000;
  line-height: 18px;
  resize: none;
  &:focus {
    outline: none;
  }
`
const SaveButtonContainer = styled.div`
  display: flex;
  grid-column-end: span 2;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`
const Button = styled.button<{
  bgColor?: string
  color?: string
  border?: string
}>`
  width: 150px;
  height: 50px;
  border-radius: 8px;
  padding: 1px 6px;
  font-weight: bold;
  border: ${(props) => (props.border ? props.border : null)};
  background-color: ${(props) => (props.bgColor ? props.bgColor : null)};
  color: ${({ color }) => (color ? color : '#000')};
  &:active {
    filter: brightness(50%);
  }
`


export default CreateForm
