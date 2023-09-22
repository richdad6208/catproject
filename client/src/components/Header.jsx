import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.5rem;
  word-break: keep-all;
  h1 {
    margin-right: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 620px) {
      font-size: 18px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      @media (max-width: 620px) {
        padding: 0.2rem;
      }
      .profileUrl-wrapper {
        overflow: hidden;
        width: 50px;
        border-radius: 50%;
        aspect-ratio: 1;
        img {
          object-fit: cover;
          height: 100%;
        }
      }
    }
  }
`;

function Header() {
  const isLoggedIn = useSelector((state) => state.user.value);
  const userData = useSelector((state) => state.user.userData);
  return (
    <Wrapper>
      <h1>
        <Link to="/">캣프로젝트</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/posts">냥이자랑</Link>
          </li>
          <li>
            <Link to="/photos">랜덤냥이</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to={`/users/${userData.shortId}`}>
                  <div className="profileUrl-wrapper">
                    <img src={userData.profileUrl} alt="" />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/logout">로그아웃</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          )}
        </ul>
      </nav>
    </Wrapper>
  );
}

export default Header;
