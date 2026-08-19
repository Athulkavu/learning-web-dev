import { useDispatch } from "react-redux";
import { updateTask } from "./slices/taskSlice";

function EditTaskModal({ task, onClose }) {
  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedTask = {
      id: task.id,
      title: formData.get("title"),
      isCompleted: formData.get("isCompleted") === "on",
    };

    dispatch(updateTask(updatedTask));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="edit-task-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor={`title-${task.id}`}>Title</label>
            <input
              id={`title-${task.id}`}
              type="text"
              name="title"
              defaultValue={task.title}
              required
            />
          </div>

          <div className="form-check">
            <input
              id={`completed-${task.id}`}
              type="checkbox"
              name="isCompleted"
              defaultChecked={task.isCompleted}
            />
            <label htmlFor={`completed-${task.id}`}>Completed</label>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="update-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
