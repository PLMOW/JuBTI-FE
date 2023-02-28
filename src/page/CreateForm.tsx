import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

function CreateForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isImage, setImage] = useState({
    image_file: "",
    preview_URL: "",
  });

  let inputRef;

  const [data, setData] = useState({
    Title: '',
    Mbti: '',
    Material: '',
    Content: '',
  });

  const onClickHandler = async(e: any) => {
    e.preventDefault();

    // console.log(isImage.image_file);
    // console.log(data.Title);
    // console.log(data.Mbti);
    // console.log(data.Material);
    // console.log(data.Content);

    if (isImage.image_file === '' ) {
      return alert('이미지를 넣어주세요.');
    }
    if (data.Title.trim() === '' ) {
      return alert('제목을 입력해주세요.');
    }
    if (data.Mbti.trim() === '' ) {
      return alert('Mbti를 입력해주세요.');
    }
    if (data.Material.trim() === '' ) {
      return alert('재료를 선택해주세요.');
    }
    if (data.Content.trim() === '' ) {
      return alert('레시피를 입력해주세요.');
    }

    const formData = new FormData()
    formData.append('file', isImage.image_file);
    formData.append('title', data.Title);
    formData.append('mbti', data.Mbti);
    formData.append('material', data.Material);
    formData.append('content', data.Content);
    
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    

    // axios 활용 서버에 전송 하기
    axios
    .post(
      `http://3.36.29.101/api/recipe`,  formData ,
       {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      // Image: formData,
      // Title: data.Title,
      // Mbti: data.Mbti,
      // Material: data.Material,
      // Content: data.Content,
    })
    .then((res) => {
      if (res.data.success) {
        alert('레시피가 작성되었습니다.');
        navigate('/detail/:id');
      } else {
        alert('작성에 실패하였습니다.');
        navigate('/createform');
      }
    })
    .catch((err) => {
      alert('작성에 실패하였습니다.');
      navigate('/createform');
    });



    // 데이터 내용 초기화
    setImage({
      image_file: "",
      preview_URL: "",
    });
    setData({
      Title: '',
      Mbti: '',
      Material: '',
      Content: '',
    });

  }


  // 이벤트 핸들러
  const changhandler = (e : any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    
    // 엔터('\n') 개수를 세서 textareaHeight에 저장
    setTextareaHeight(e.target.value.split('\n').length - 1);
    e.preventDefault();
  };

  // ContentTextarea 컨텐츠 확장기능
  // 줄 수를 계산해서 저장할 변수
  const [textareaHeight, setTextareaHeight] = useState(0);
  
  

  // // 이미지 미리보기 저장할 변수
  // const [previewImg, setPreviewImg ] = useState<any>([]);

  // 이미지 업로드 input의 onChange
  const imgHandler = (e : any) => {
    if(e.target.files[0]){
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(isImage.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => (
        {
          image_file: e.target.files[0],
          preview_URL: preview_URL
        }
      ))
    }
  };

  // useEffect(()=> {
  //   // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
  //   return () => {
  //     URL.revokeObjectURL(isImage.preview_URL)
  //   }
  // }, [])


  //   const { name, value } = e.target;

  //   // FileReader API로 이미지 인식
  //   let reader = new FileReader();
  //   const file = e.target.files[0];
  //   console.log(e.target.files);

  //   if(file) {
  //     reader.readAsDataURL(file);  // 1. reader에게 file을 먼저 읽히고
      
  //     setData({ ...data, [name]: value});
  //   }

  //   // 2. 사진 올리고 나서 처리하는 event
  //   reader.onloadend = () => {
  //     const previewImgUrl = reader.result || null
  //     if(previewImgUrl) {
  //       setPreviewImg([...previewImg, previewImgUrl])
  //     }
  //     e.target.value = ''; // 3. 같은 파일을 올리면 인지못해서 여기서 초기화
  //   }; // 4. 비동기적으로 load가 끝나면 state에 저장
  // };

  return (
    <CreateWrapper>
      <Forms onSubmit={onClickHandler}>
        <ImgForm> 
          <Img  alt="이미지추가" src={isImage.preview_URL} /> 
          <ImgInput 
            type="file"
            multiple
            name='Image'
            accept='image/*'
            onChange={imgHandler}
            onClick={(e :any) => e.target.value = null}
            ref={refParam => inputRef = refParam}
          />
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
              name="Mbti"
              onChange={changhandler}
              placeholder="mbti를 적어주세요!"
            />
          </MbtiForm>
          <MaterialForm name='Material' onChange={changhandler} >
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
            name='Content'
            placeholder="당신의 레시피를 적어주세요!"
            onChange={changhandler}
            style={{height: ((textareaHeight + 2) * 18) + 'px'}}   
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
