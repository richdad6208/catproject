import { useSelector } from "react-redux/es/hooks/useSelector";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo/Todo";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { inputUser } from "../app/userSlice";

const Wrapper = styled.div`
  .image-wrapper {
    width: 150px;
    border-radius: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  width: 90%;
  margin-inline: auto;
  text-align: left;
  padding-block: 1rem;
  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  .even-columns {
    display: flex;
    justify-content: center;
    align-items: start;
    form {
      margin-top: 30px;
      font-size: 15px;
      width: 200px;
      input {
        margin-bottom: 10px;
      }
    }
    .user__inform {
      .user__body {
        font-size: 22px;
        margin-top: 20px;
      }
    }
  }
`;

function Profile() {
  const { shortId } = useParams();
  const [profileImage, setProfileImage] = useState();
  const [userImageUrl, setUserImageUrl] = useState("");
  const userData = useSelector((state) => state.user.userData);
  const isLoggedIn = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigator("/login");
    }
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", profileImage);

    axios
      .post(`/api/users/${shortId}/profile-image`, formData)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.user);
          dispatch(inputUser(res.data.user));
        }
      })
      .catch((err) => console.log(err));
  }
  function uploadImage(e) {
    let file = e.target.files[0];
    setProfileImage(file);
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setUserImageUrl(reader.result);
    };
  }
  return (
    <>
      <Wrapper>
        <h2>어서오세요! {userData.userName}님 환영합니다</h2>
        <div className="even-columns">
          <div>
            <div className="image-wrapper">
              <img src={userImageUrl || userData.profileUrl} alt="" />
            </div>
            <form
              onSubmit={onSubmit}
              method="post"
              encType="multipart/form-data"
            >
              <input
                type="file"
                name="userImage"
                id="userImage"
                onChange={uploadImage}
                accept="image/*"
              />
              <button>프로필 사진 변경</button>
            </form>
          </div>
          <div className="user__inform">
            <p className="user__body">이메일: {userData.email}</p>
            <p className="user__body">이름: {userData.userName}</p>
          </div>
        </div>
        <Todo />
      </Wrapper>
    </>
  );
}

export default Profile;
