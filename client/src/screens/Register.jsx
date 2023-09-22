import { useState } from "react";
import { Wrapper } from "../styles/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  function submitAccount(e) {
    e.preventDefault();
    const body = { email, password, passwordConfirm, userName };

    if (password !== passwordConfirm) {
      setValidation("wrongPassword");
    }
    axios
      .post("/api/register", body)
      .then((res) => {
        if (res.data.success) {
          setValidation("");
          navigate("/");
        } else {
          setValidation(res.data.errorMessage);
        }
      })
      .catch((err) => err);
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
      <h2>회원가입</h2>
      {validation === "wrongEmail" ? (
        <p className="errorMessage">사용 중인 이메일입니다.</p>
      ) : (
        <p></p>
      )}
      {validation === "wrongPassword" ? (
        <p className="errorMessage">비밀번호가 일치하지 않습니다.</p>
      ) : (
        <p></p>
      )}
      {validation === "wrongUserName" ? (
        <p className="errorMessage">사용 중인 닉네임입니다.</p>
      ) : (
        <p></p>
      )}
      <form onSubmit={submitAccount}>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
          placeholder="이메일을 입력해주세요"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          maxLength="10"
          required
          placeholder="비밀번호를 입력해주세요 (10자 미만)"
        />
        <input
          type="password"
          maxLength="10"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          value={passwordConfirm}
          required
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <input
          type="text"
          maxLength="10"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          required
          placeholder="닉네임을 지어주세요"
        />
        <button>회원가입</button>
      </form>
    </Wrapper>
  );
}
export default Register;
