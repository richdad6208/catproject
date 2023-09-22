import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
const Wrapper = styled.div`
  .post-wrapper {
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
        margin-top: 10px;
        font-size: 15px;
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
        .post__profile {
          width: 30px;
          display: block;
          aspect-ratio: 1;
          overflow: hidden;
          img {
            object-fit: cover;
            height: 100%;
          }
        }
        .post__author__date-wrapper {
          display: flex;
          justify-content: space-between;
        }
        .post__date {
          font-size: 13px;
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
            padding-inline: 30px;
            margin-bottom: 10px;
            background: whitesmoke;
            display: flex;
            align-items: center;
            gap: 20px;
            line-height: 1;
            .comment__delete {
              cursor: pointer;
            }
            .comment__profile {
              width: 30px;
              border-radius: 50%;
              aspect-ratio: 1;
              overflow: hidden;
              img {
                object-fit: cover;
                height: 100%;
              }
            }
            .comment__author-wrapper {
              display: flex;
              justify-content: space-between;
            }
            .comment__author {
              font-size: 17px;
            }
            .comment__body {
              font-size: 17px;
            }
          }
        }
        input {
          border: 1px solid dodgerblue;
          border-radius: 5px;
          width: 80%;
          padding: 0.1em;
          &::placeholder {
            color: var(--crl-neutral-300);
            font-size: 17px;
          }
          &:focus {
            outline: 0;
            border: 2px solid dodgerblue;
          }
        }
      }
    }
  }
`;

function Detail() {
  const navigator = useNavigate();
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
    if (comment.length < 2) {
      return alert("2글자 이상 입력해주세요");
    }
    const body = { comment, shortIdOfLoggedInUser };
    axios
      .post(`/api/posts/${shortId}/comments`, body)
      .then((response) => {
        if (response.data.success) {
          let temp = [...response.data.post.comments];
          setComments(temp.reverse());
        } else {
          console.log(response.data.errorMessage);
        }
      })
      .catch((err) => console.log(err));
  }
  // function deleteComment(commentId) {
  //   axios
  //     .delete(`/api/posts/${shortId}/comments/${commentId}`)
  //     .then((response) => {
  //       if (response.date.success) {
  //         let temp = [...response.data.post.comments];
  //         setComments(temp.reverse());
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  useEffect(() => {
    axios
      .get(`/api/posts/${shortId}`)
      .then((response) => {
        if (response.data.success) {
          setPost(response.data.post);
          let temp = [...response.data.post.comments];
          setComments(temp.reverse());
          console.log(response.data.post.comments);
        } else {
          console.log("해당 포스트에 문제가 있습니다");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <div
        className="post-wrapper"
        onClick={(e) => {
          if (e.target.className === "post-wrapper") {
            navigator("/posts");
          }
        }}
      >
        <div className="post__container">
          <div className="post__image__container">
            <img className="post__image" src={post.imageUrl} alt="" />
          </div>
          <div className="post__text__container">
            <div>
              <div className="post__author__date-wrapper">
                <p className="post__author">
                  {post.author?.userName}
                  <span className="post__profile">
                    <img src={post.author?.profileUrl} alt="" />
                  </span>
                </p>
                <span className="post__date">
                  {post.createdAt} 👁‍🗨{post.view} 💬{post.comments?.length}
                </span>
              </div>
              <p className="post__title">{post.title}</p>
              <p className="post__body">{post.content}</p>

              <ul className="comment__list">
                {comments.map((comment, idx) => {
                  return (
                    <li className="comment__container" key={idx}>
                      <Link to={`/users/${comment.author?.shortId}`}>
                        <div className="comment__profile">
                          <img src={comment.author?.profileUrl} alt="" />
                        </div>
                      </Link>
                      <div style={{ width: "100%" }}>
                        <div className="comment__author-wrapper">
                          <span className="comment__author">
                            {comment.author?.userName}
                          </span>
                          <span className="comment__body">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p
                          className="comment__body"
                          style={{ marginTop: "10px" }}
                        >
                          {comment.content}
                        </p>
                      </div>
                      {/* {shortIdOfLoggedInUser === comment.author?.shortId ? (
                        <span
                          className="comment__delete"
                          onClick={() => {
                            deleteComment(comment._id);
                          }}
                        >
                          ❌
                        </span>
                      ) : null} */}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="post__input__container">
              <input
                name="commentInput"
                type="text"
                placeholder="댓글달기"
                onChange={inputComment}
              />
              <Button content="게시" handler={sendComment} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Detail;
