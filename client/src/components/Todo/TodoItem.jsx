import{ useState } from "react";

const TodoItem = ({ id, item, onDelete, onEdit, key }) => {
  const [isEdit, setIsEdit] = useState(false);
  console.log(key);

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
    <div className="todo-item">
      {isEdit ? (
        <>
          <textarea value={item} onChange={handleChangeInputEdit} />
        </>
      ) : (
        <>{item}</>
      )}
      <button onClick={handleEditButton}>수정</button>
      <button onClick={handleDeleteButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
