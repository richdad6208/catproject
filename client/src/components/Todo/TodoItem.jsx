import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .todo-item {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 0.4em 0.6em;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .todo__button {
    background: dodgerblue;
    border: none;
    padding: 0.2em 0.3em;
    border-radius: 5px;
    color: white;
    margin-right: 10px;
    font-size: 15px;
    cursor: pointer;

    &.warn {
      background: crimson;
    }
  }
`;

const TodoItem = ({ id, item, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  //key
  // 수정버튼 눌렀을때 상태 바꿔주는 함수
  const handleEditButton = () => {
    setIsEdit((isEdit) => !isEdit);
  };
  // textarea 값이 바뀌었을때 onEdit함수에 매개변수를 넘겨주는 함수
  const handleChangeInputEdit = (e) => {
    onEdit(id, e.target.value);
  };
  // 삭제버튼을 눌렀을때 onDelete(id) 호출
  const handleDeleteButton = () => {
    onDelete(id);
  };

  return (
    <Wrapper>
      <div className="todo-item">
        {isEdit ? (
          <>
            <textarea value={item} onChange={handleChangeInputEdit} />
          </>
        ) : (
          <>{item}</>
        )}
        <div>
          <button className="todo__button " onClick={handleEditButton}>
            수정
          </button>
          <button className="todo__button warn" onClick={handleDeleteButton}>
            삭제
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default TodoItem;
