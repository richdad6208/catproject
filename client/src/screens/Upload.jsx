import styled from "styled-components";
import Button from "../components/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
  .button-wrapper {
    margin-top: 20px;
    text-align: right;
  }
  width: min(700px, 90%);
  background: var(--crl-neutral-100);
  margin-inline: auto;
  border-radius: 10px;
  margin-block: 2em;
  padding: 2em;
  .image-wrapper {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 50% 50%;
    @media (max-width: 684px) {
      display: block;
    }
    .image-container {
      aspect-ratio: 1;
      background: gray;
      border-radius: 10px;
      overflow: hidden;
      img {
        height: 100%;
        object-fit: cover;
      }
      @media (max-width: 684px) {
        margin-block: 1em;
        width: 90%;
        margin-inline: auto;
      }
    }
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    input,
    textarea {
      margin-top: 5px;
      resize: none;
      border: none;
      border-radius: 10px;
      padding: 0.3em;
      &:focus {
        outline: 3px solid dodgerblue;
      }
    }
  }
`;

function Upload() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user.userData);
  function uploadPost(e) {
    e.preventDefault();

    if (!title) {
      alert("제목을 입력해주세요");
      return;
    }

    if (!content) {
      alert("내용을 입력해주세요");
      return;
    }

    if (!file) {
      alert("사진을 올려주세요");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("user", user._id);
    axios
      .post("/api/posts", formData)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.post);
          navigate("/board");
        } else {
          console.log(response.data.errorMessage);
        }
      })
      .catch((err) => console.log(err));
  }
  function writeTitle(e) {
    setTitle(e.target.value);
  }

  function writeContent(e) {
    setContent(e.target.value);
  }
  function previewImage(e) {
    const uploadFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", uploadFile);
    setFile(uploadFile);

    let readFile = new FileReader();
    readFile.readAsDataURL(uploadFile);
    readFile.onload = () => {
      setImageUrl(readFile.result);
    };
  }
  return (
    <Wrapper>
      <h2>게시글</h2>
      <form method="post" encType="multipart/form-data" onSubmit={uploadPost}>
        <div className="image-wrapper">
          <div>
            <label htmlFor="boardImage">사진등록</label>
            <input
              type="file"
              onChange={previewImage}
              id="boardImage"
              name="boardImage"
              accept="image/*"
            />
          </div>
          <div>
            <div className="image-container">
              <img src={imageUrl} alt="" />
            </div>
            <p>미리보기</p>
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            minLength="2"
            maxLength="50"
            onChange={writeTitle}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="title">내용</label>
          <textarea
            name="content"
            value={content}
            rows="5 "
            minLength="2"
            maxLength="200"
            onChange={writeContent}
          ></textarea>
        </div>
        <div className="button-wrapper">
          <Button content="올리기" />
        </div>
      </form>
    </Wrapper>
  );
}

export default Upload;
