import TodoItem from "./TodoItem";

function TodoBoard({ todoList, onDelete, onEdit }) {
  return (
    <div>
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          item={item.todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoBoard;
