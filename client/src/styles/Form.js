import styled from "styled-components";

export const Wrapper = styled.div`
  h2 {
    text-align: center;
    padding-block: 1em;
  }
  .errorMessage {
    color: red;
    text-align: center;
    font-size: 18px;
    padding-block: 0.3em;
  }
  width: 50%;
  margin-inline: auto;
  padding-block: 5em;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    input {
      padding: 0.3em;
      &::placeholder {
        font-size: 16px;
      }
    }
    button {
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
    }
  }
`;
