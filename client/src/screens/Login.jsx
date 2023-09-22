import { useState } from "react";
import { Wrapper } from "../styles/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn, inputUser } from "../app/userSlice";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  function loginAccount(e) {
    e.preventDefault();
    const body = { email, password };

    axios
      .post("/api/login", body)
      .then((res) => {
        if (res.data.success) {
          dispatch(loggedIn());
          dispatch(inputUser(res.data.user));
          console.log(res.data.user);
          setValidation("");
          navigate("/");
        } else {
          setValidation(res.data.errorMessage);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Wrapper>
      <p
        style={{
          textAlign: "center",
          marginInline: "auto",
          wordBreak: "keep-all",
        }}
      >
        비밀번호는 해쉬로 처리하여 안전합니다. 시연시간 15분 후 데이터베이스
        초기화 및 서버 닫을 예정입니다.
      </p>
      <h2>로그인</h2>
      {validation === "wrongEmail" ? (
        <p className="errorMessage">아이디가 존재하지 않습니다.</p>
      ) : (
        <p></p>
      )}
      {validation === "wrongPassword" ? (
        <p className="errorMessage">비밀번호가 일치하지 않습니다</p>
      ) : (
        <p></p>
      )}
      <form onSubmit={loginAccount}>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="이메일을 입력해주세요"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요"
        />
        <button>로그인</button>
        <p>
          <Link to="/register">회원가입이 필요하세요? &rarr;</Link>
        </p>
      </form>
    </Wrapper>
  );
}
export default Login;
