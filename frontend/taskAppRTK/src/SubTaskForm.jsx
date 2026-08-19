import { useDispatch } from "react-redux";
import { addSubTask } from "./slices/taskSlice";

function SubTaskForm({ taskId }) {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("subTaskTitle");

    if (!title.trim()) return;

    dispatch(addSubTask({ taskId, title }));
    event.currentTarget.reset();
  };

  return (
    <form className="subtask-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="subTaskTitle"
        placeholder="Enter sub task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default SubTaskForm;
