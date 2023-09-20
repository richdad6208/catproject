import styled from "styled-components";

const Wrapper = styled.button`
  border: 3px solid dodgerblue;
  background: dodgerblue;
  color: white;
  padding: 0.3em 0.5em;
  border-radius: 10px;
  &:hover {
    background: white;
    color: dodgerblue;
    border: 3px solid dodgerblue;
  }
`;

function Button({ content }) {
  return <Wrapper>{content}</Wrapper>;
}

export default Button;
