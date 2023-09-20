import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.5rem;
  ul {
    display: flex;
    li {
      padding: 0.5rem;
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
            <Link to="/photos">사진구경</Link>
          </li>
          <li>
            <Link to="/board">냥이자랑</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to={`/user/${userData._id}`}>마이페이지</Link>
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
