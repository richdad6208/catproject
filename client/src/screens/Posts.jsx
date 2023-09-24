import styled from "styled-components";
import Button from "../components/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  text-align: right;
  width: min(1200px, 90%);
  margin-inline: auto;
  Button {
    margin-block: 1rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-inline: auto;
  @media (min-width: 601px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1201px) {
    grid-template-columns: repeat(4, 1fr);
  }
  .image-wrapper {
    aspect-ratio: 1;
    img {
      object-fit: cover;
      object-position: center center;
      width: 100%;
      height: 100%;
    }
  }
`;

function Posts() {
  const isLoggedIn = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(posts);
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다");
      navigate("/login");
    }

    axios
      .get("/api/posts")
      .then((response) => {
        if (response.data.success) {
          let temp = [...response.data.posts];
          setPosts(temp.reverse());
        } else {
          console.log("포스트들을 불러오지 못했습니다");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Outlet />
      <Wrapper>
        <Link to="/upload">
          <Button content="Upload" />
        </Link>
        {posts.length ? null : <h2>현재 등록된 글이 없습니다</h2>}
        <ImageGrid>
          {posts.map((item, idx) => {
            return (
              <div className="image-wrapper" key={idx}>
                <img
                  src={item.imageUrl}
                  alt=""
                  onClick={() => {
                    navigate(`/posts/${item.shortId}`);
                  }}
                />
              </div>
            );
          })}
        </ImageGrid>
      </Wrapper>
    </>
  );
}
export default Posts;
