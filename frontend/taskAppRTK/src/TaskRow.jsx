import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTaskStatus, removeTask } from "./slices/taskSlice";
import SubTasks from "./SubTasks";
import EditTaskModal from "./EditTaskModal";

function TaskRow({ task }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

  const handleCompletedChange = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <>
      <tr>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleCompletedChange}
          />
        </td>
        <td>
          <SubTasks taskId={task.id} subTasks={task.subTasks} />
        </td>
        <td>
          <div className="task-actions">
            <button type="button" className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button
              type="button"
              className="remove-button"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </td>
      </tr>

      {showEditModal && (
        <EditTaskModal task={task} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
}

export default TaskRow;
