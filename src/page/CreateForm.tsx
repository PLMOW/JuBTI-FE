import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCookie } from '../util/cookie'
import styled from 'styled-components'

function CreateForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let inputRef;
  let token = getCookie('accessToken') // 쿠키에저장
  const [isImage, setImage] = useState('');
  const [previewImg, setPreviewImg ] = useState('');
  const [data, setData] = useState({
    title: '',
    mbti: '',
    material: '',
    content: '',
    imageUrl: '',
  })

  const onClickHandler = async(e: any) => {
    e.preventDefault();

    console.log(isImage);
    console.log(data.title);
    console.log(data.mbti);
    console.log(data.material);
    console.log(data.content);
    console.log(data.imageUrl);

    if (isImage === '' ) {
      return alert('이미지를 넣어주세요.');
    }
    if (data.title.trim() === '') {
      return alert('제목을 입력해주세요.')
    }
    if (data.mbti.trim() === '') {
      return alert('Mbti를 입력해주세요.')
    }
    if (data.material.trim() === '') {
      return alert('재료를 선택해주세요.')
    }
    if (data.content.trim() === '') {
      return alert('레시피를 입력해주세요.')
    }

    const formData = new FormData()
    formData.append('image', isImage);

    const body = [{
      title: data.title,
      mbti: data.mbti,
      material: data.material,
      content: data.content,
      // image: data.imageUrl,
    }]
    console.log(body);

    formData.append("data", new Blob([JSON.stringify(body)], {type: "application/json"}))
    
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    console.log('token : ', token)
    
    // axios 활용 서버에 전송 하기
    const res = axios
      .post(
        // `http://3.36.29.101/api/recipe`
        `http://3.36.29.101/api/recipe`, formData
        // {
        //   title: data.title,
        //   mbti: data.mbti,
        //   material: data.material,
        //   content: data.content,
        //   image: data.imageUrl,
        // }
        ,
        {
          headers: {
            Authorization: token,
            contentType : "multipart/form-data"
          },
        }
      )
      .then((res) => {
        console.log(res)
        navigate('/detail/:id')
        alert('작성완료')
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })

    // 데이터 내용 초기화
    setImage('');
    setData({
      title: '',
      mbti: '',
      material: '',
      content: '',
      imageUrl: '',
    })
  }

  // 이벤트 핸들러
  const changhandler = (e: any) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })

    // 엔터('\n') 개수를 세서 textareaHeight에 저장
    setTextareaHeight(e.target.value.split('\n').length - 1);
    e.preventDefault();
  };
  // ContentTextarea 컨텐츠 확장기능(줄 수를 계산해서 저장할 변수)
  const [textareaHeight, setTextareaHeight] = useState(0)

  

  // 이미지 업로드 및 미리보기
  const imgHandler = (e : any) => {
    if(e.target.files[0]){
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(previewImg);
      const preview_image = URL.createObjectURL(e.target.files[0]);
      setImage(e.target.files[0]);
      setPreviewImg(preview_image);
    }
  };

  useEffect(()=> {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(previewImg)
    }
  }, [])

  // test
  return (
    <CreateWrapper>
      <Forms onSubmit={onClickHandler}>
        <ImgForm> 
          <Img  
            alt="이미지 들어가는 곳"
            src={previewImg} 
            // src={data.imageUrl}
          /> 
          <ImgInput 
            type="file"
            multiple
            name="image"
            accept="image/*"
            onChange={imgHandler}
            onClick={(e :any) => e.target.value = null}
            ref={refParam => inputRef = refParam}

            // type="text"
            // name="imageUrl"
            // onChange={changhandler}
          />
        </ImgForm>
        <CreateFormWrapIn>
          <TitleForm>
            <InputBox
              type="text"
              name="title"
              onChange={changhandler}
              placeholder="제목을 적어주세요!"
            />
          </TitleForm>
          <MbtiForm>
            <InputBox
              type="text"
              name="mbti"
              onChange={changhandler}
              placeholder="mbti를 적어주세요!"
            />
          </MbtiForm>
          <MaterialForm name="material" onChange={changhandler}>
            <option value="" hidden>
              주 재료를골라주세요!
            </option>
            <option value="사케">사케</option>
            <option value="와인">와인</option>
            <option value="위스키">위스키</option>
            <option value="막걸리">막걸리</option>
            <option value="기타">기타</option>
          </MaterialForm>
        </CreateFormWrapIn>
        <ContentForm>
          <ContentTextarea
            name="content"
            placeholder="당신의 레시피를 적어주세요!"
            onChange={changhandler}
            style={{ height: (textareaHeight + 2) * 18 + 'px' }}
          />
        </ContentForm>
        <SaveButtonContainer>
          <Button bgColor="#000" border="3px solid #fff" color="white">
            저장
          </Button>
          <Button
            bgColor="#fff"
            border="3px solid black"
            // onClick={() => {
            //   navigate('/mainpage')
            // }}
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
`
const MbtiForm = styled.div`
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
const MaterialForm = styled.select`
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
  margin: 20px 5px;
`
const ContentForm = styled.div`
  border-top: 1px solid #e0e0e0;
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
