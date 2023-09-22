import { useRef, useState } from "react";
import TodoBoard from "./TodoBoard";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  input {
    border: 2px solid transparent;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 0.3em 0.4em;
    margin-right: 10px;
    border-radius: 2px;
    &:focus {
      outline: 2px solid dodgerblue;
    }
  }
  .input-wrapper {
    display: flex;
  }
  button {
    background: dodgerblue;
    border: none;
    padding: 0.5em 0.6em;
    border-radius: 5px;
    color: white;
    margin-right: 10px;
    font-size: 18px;
    cursor: pointer;
  }
`;

export default function Todo() {
  const [todoValue, setTodoValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const nextId = useRef(1);

  // 할일 입력값이 바뀔때 함수
  const handleChangeInputItem = (e) => {
    setTodoValue(e.target.value);
  };
  // 추가 버튼 눌렀을떄 함수
  const handleClickAddList = () => {
    setTodoList((state) => [
      ...state,
      { id: nextId.current++, todo: todoValue },
    ]);
  };
  // id에 해당하는 item을 todoList에서 삭제하는 함수
  const handleChangeDeleteItem = (id) => {
    setTodoList((state) => state.filter((el) => el.id !== id));
  };
  // id에 해당하는 item을 todoList에서 text로 바꾸는 함수
  const handleEditItem = (id, text) => {
    setTodoList((state) =>
      state.map((item) => (item.id === id ? { ...item, todo: text } : item))
    );
  };

  return (
    <Wrapper>
      <div>
        <h3>To Do List</h3>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={todoValue}
            onChange={handleChangeInputItem}
          />
          <button onClick={handleClickAddList}>추가</button>
        </div>
        <TodoBoard
          todoList={todoList}
          onDelete={handleChangeDeleteItem}
          onEdit={handleEditItem}
        />
      </div>
    </Wrapper>
  );
}
