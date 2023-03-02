import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../util/cookie'
import styled from 'styled-components'
import { title } from 'process'

function CreateForm() {
  const navigate = useNavigate()
  const fileSizeMax = 3 * 1024 * 1024;  // 3mb 제한
  let inputRef;
  let token = getCookie('accessToken') // 쿠키에저장
  const [image, setImage] = useState([]);
  const [previewImg, setPreviewImg ] = useState('');
  const [data, setData] = useState({
    title: '',
    mbti: '',
    material: '',
    content: '',
  })
  const [titleInputCount, setTitleInputCount] = useState(0);
  const [contentInputCount, setContentInputCount] = useState(0);

  const onClickHandler = async (e: any) => {
    e.preventDefault();
    if (image.length === 0 ) return alert('이미지를 넣어주세요.');
    if (data.title.trim() === '') {
      return alert('제목을 입력해주세요.');
    } else if(data.title.length > 20) {
      return alert('글자 수 초과!');
    }
    if (data.mbti.trim() === '') return alert('MBTI를 선택해주세요.');  
    if (data.material.trim() === '') return alert('재료를 선택해주세요.');
    if (data.content.trim() === '') {
      return alert('레시피를 입력해주세요.');
    } else if(data.title.length > 255) {
      return alert('글자 수 초과!');
    }

    const formData = new FormData();
    // formData에 이미지 append
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i])
    }
    // formData에 객체를 JSON문법에 맞게 변형
    const {title, mbti, material, content} = data;
    const body = JSON.stringify({title, mbti, material, content});  
    formData.append('data', new Blob([body], {type: "application/json"}));

    for (let i of formData.entries()) console.log('key', i);
    
    // axios 활용 서버에 전송 하기
    const res = await axios({
      method: "POST",
      url: "http://3.36.29.101/api/recipe",
      data: formData,
      headers: {
        Authorization: token,
        'Content-Type' : "multipart/form-data"
      },
    }).then((res) => {
      console.log(res)
      navigate('/detail/:id')
      alert('작성완료')
    })
    .catch((error) => {
      console.log(error)
      alert(error.response.data.message)
    })
  
    console.log('target :', res);
          
    // 데이터 내용 초기화
    setImage([]);
    setData({
      title: '',
      mbti: '',
      material: '',
      content: '',
    });
    setPreviewImg('');
  }
  // title 핸들러
  const titleHandler = (e: any) => { 
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    // title input 글자수 표기
    setTitleInputCount(e.target.value.length);
  }
  // selectOption 핸들러
  const selectHandler = (e: any) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  // ContentTextarea 컨텐츠 확장기능(줄 수를 계산해서 저장할 변수)
  const [textareaHeight, setTextareaHeight] = useState(0)
  // content 핸들러
  const contentHandler = (e: any) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    // content input 글자수 표기
    setContentInputCount(e.target.value.length)
    // 엔터('\n') 개수를 세서 textareaHeight에 저장
    setTextareaHeight(e.target.value.split('\n').length - 1); 
  };
  // 이미지 업로드 및 미리보기
  const imgHandler = async (e : any) => {
    const {target: {files}} = e;
    console.log(files[0])
    // 파일이 없을때 체크
    if(!files[0]) return;

    var reg = /(.*?)\.(jpg|jpeg|png|webp)$/;
    for (let i = 0; i < files.length; i++) {
      // 파일 확장자 체크
      if(!files[i].name.match(reg)) {
        e.target.value = '';
        setPreviewImg('');
        alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : jpg jpeg png webp]`)
        return
      }
      // 파일 용량 체크
      if(files.size > fileSizeMax) {
        e.target.value = '';
        setPreviewImg('');
        alert('업로드 가능한 최대 용량은 3MB입니다!!')
        return;
      }
    }
    
    // 이미지를 state에 셋
    setImage(files);
    // 미리보기용 url
    const objectURL = URL.createObjectURL(e.target.files[0])
    setPreviewImg(objectURL);
  };

  useEffect(()=> {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(previewImg)
    }
  }, [])
  return (
    <CreateWrapper>
      <Forms onSubmit={onClickHandler}>
        <ImgForm> 
          <Img  
            alt="이미지 들어가는 곳"
            src={previewImg} 
          /> 
          <ImgInput 
            type="file"
            multiple
            name="image"
            accept="image/jpg,jpeg,png,webp"
            onChange={imgHandler}
            onClick={(e :any) => e.target.value = null}
            ref={refParam => inputRef = refParam}
          />
        </ImgForm>
        <CreateFormWrapIn>
          <TitleForm>
            <InputBox
              type="text"
              name="title"
              onChange={titleHandler}
              maxLength={20}
              placeholder="제목을 적어주세요!"
            />
            <p>
              <span>{titleInputCount}</span>
              <span>/20 자</span>
            </p>
          </TitleForm>
          <MbtiForm>
            <SelectBox name="mbti" onChange={selectHandler}>
              <option value="" hidden>
                MBTI를 골라주세요!
              </option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISTP">ISTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INTJ">INTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ISFP">ISFP</option>
              <option value="INFP">INFP</option>
              <option value="INTP">INTP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFP">ESFP</option>
              <option value="ENFP">ENFP</option>
              <option value="ENTP">ENTP</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ESTP">ESTP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENTJ">ENTJ</option>
            </SelectBox>
          </MbtiForm>
          <MaterialForm>
            <SelectBox name="material" onChange={selectHandler}>
              <option value="" hidden>
                주 재료를골라주세요!
              </option>
              <option value="사케">사케</option>
              <option value="맥주">맥주</option>
              <option value="탁주">탁주</option>
              <option value="와인">와인</option>
              <option value="증류주">증류주</option>
              <option value="막걸리">막걸리</option>
              <option value="위스키">위스키</option>
              <option value="브랜디">브랜디</option>
              <option value="샴페인">샴페인</option>
              <option value="칵테일">칵테일</option>
              <option value="전통주">전통주</option>
              <option value="기타">기타</option>
            </SelectBox>
          </MaterialForm>
        </CreateFormWrapIn>
        <ContentForm>
          <ContentTextarea
            name="content"
            placeholder="당신의 레시피를 적어주세요!"
            onChange={contentHandler}
            maxLength={255}
            style={{ height: (textareaHeight + 2) * 18 + 'px' }}
          />
          <p>
            <span>{contentInputCount}</span>
            <span>/255 자</span>
          </p>
        </ContentForm>
        <SaveButtonContainer>
          <Button bgColor="#000" border="3px solid #fff" color="white">
            저장
          </Button>
          <Button
            bgColor="#fff"
            border="3px solid black"
            onClick={() => {
              navigate('/mainpage')
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
const ImgForm = styled.label`
  width: 400px;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
`
const Img = styled.img`
  width: 400px;
  height: 400px;
`
const ImgInput = styled.input`
  display: none;
`
const Forms = styled.form`
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
  margin: 20px 0px;
  p {
    margin-top: 10px;
    text-align: right;
  }
`
const MbtiForm = styled.div`
  overflow: hidden;
  margin-bottom: 57px;
  line-height: 36px;
  word-break: break-all;
  margin: 20px 0px;
`
const MaterialForm = styled.div`
  overflow: hidden;
  margin-bottom: 57px;
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
const SelectBox = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  border-bottom: 2px solid #000;
  margin: 20px 0px;
  padding-left: 10px;
  option {
    font-size: 14px;
    padding: 16px 18px;
    border: none;
    transition: background-color 0.2s ease-in;
    &:hover {
      background-color: #ddd;
    }
  }
`

const ContentForm = styled.div`
  border-top: 1px solid #e0e0e0;
  padding: 20px 0px;
  font-family: none;
  font-weight: initial;
  display: grid;
  grid-column-end: span 2;
  p {
    margin-top: 10px;
    text-align: right;
  }
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
