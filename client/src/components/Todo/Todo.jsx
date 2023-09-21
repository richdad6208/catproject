import { useRef, useState } from "react";
import TodoBoard from "./TodoBoard";

export default function Todo() {
  const [todoValue, setTodoValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const nextId = useRef(1);
  console.log(todoList);

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
    <>
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={todoValue}
        onChange={handleChangeInputItem}
      />
      <button onClick={handleClickAddList}>추가</button>
      <TodoBoard
        todoList={todoList}
        onDelete={handleChangeDeleteItem}
        onEdit={handleEditItem}
      />
    </>
  );
}
