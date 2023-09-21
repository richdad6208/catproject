import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0 0 0 / 0.4);
  .post__container {
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    display: grid;
    grid-template-columns: 50% 50%;
    width: 70%;

    @media (max-width: 700px) {
      width: 90%;
      display: block;
    }

    background: white;
    padding: 5rem 0.5rem;
    .post__image__container {
      .post__image {
        object-fit: cover;
        width: 100%;
      }
    }
    .post__input__container {
      display: flex;
      justify-content: center;
      gap: 10px;
      @media (max-width: 700px) {
        margin-top: 50px;
      }
    }
    .post__text__container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      word-break: keep-all;
      padding-inline: 1rem;
      @media (max-width: 700px) {
        padding-block: 20px;
      }
      .post__author {
        font-size: 15px;
        margin-bottom: 5px;
      }
      .post__title {
        font-size: 18px;
      }
      .post__body {
        font-size: 15px;
      }

      .comment__list {
        margin-top: 40px;
        .comment__container {
          line-height: 1;
          .comment__author {
            font-size: 15px;
            margin-right: 20px;
          }
          .comment__body {
            font-size: 15px;
          }
        }
      }
      input {
        border: 2px solid transparent;
        width: 80%;
        padding: 0.1em;
        &::placeholder {
          color: var(--crl-neutral-300);
          font-size: 17px;
        }
        &:focus {
          outline: 0;
          border: 2px solid dodgerblue;
          border-radius: 5px;
        }
      }
    }
  }
`;

function Detail() {
  let { shortId } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([{}]);
  const [post, setPost] = useState({});
  const shortIdOfLoggedInUser = useSelector(
    (state) => state.user.userData.shortId
  );
  function inputComment(e) {
    setComment(e.target.value);
  }
  function sendComment() {
    // const body = { comment, shortIdOfLoggedInUser };
    // axios
    //   .post(`/api/posts/${shortId}/comments`, body)
    //   .then((response) => {
    //     if (response.data.success) {
    //       // let temp = [...comments];
    //       // temp.unshift
    //       setComments(response.data.post.comments);
    //     } else {
    //       console.log(response.data.errorMessage);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }
  useEffect(() => {
    axios
      .get(`/api/posts/${shortId}`)
      .then((response) => {
        if (response.data.success) {
          setPost(response.data.post);
          let temp = [...response.data.post.comments];
          setComments(temp.reverse());
        } else {
          console.log("해당 포스트에 문제가 있습니다");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <div className="post__container">
        <div className="post__image__container">
          <img className="post__image" src={post.imageUrl} alt="" />
        </div>
        <div className="post__text__container">
          <div>
            <p className="post__author">{post.author?.userName}</p>
            <p className="post__title">{post.title}</p>
            <p className="post__body">{post.content}</p>
            <ul className="comment__list">
              {comments.map((comment, idx) => {
                return (
                  <li className="comment__container" key={idx}>
                    {/* <span className="comment__author">
                      {comment.author.userName}
                    </span> */}
                    <span className="comment__body">{comment.content}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="post__input__container">
            <input type="text" placeholder="댓글달기" onChange={inputComment} />
            <Button content="게시" handler={sendComment} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Detail;
