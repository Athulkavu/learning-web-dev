import { useDispatch } from "react-redux";
import { toggleSubTaskStatus } from "./slices/taskSlice";
import SubTaskForm from "./SubTaskForm";

function SubTasks({ taskId, subTasks }) {
  const dispatch = useDispatch();

  const handleToggleSubTask = (subTaskId) => {
    dispatch(toggleSubTaskStatus({ taskId, subTaskId }));
  };

  return (
    <div className="subtasks-container">
      {subTasks.length > 0 ? (
        <div className="subtasks-list">
          {subTasks.map((subTask) => (
            <div className="subtask-item" key={subTask.id}>
              <input
                type="checkbox"
                checked={subTask.isCompleted}
                onChange={() => handleToggleSubTask(subTask.id)}
              />
              <span className={subTask.isCompleted ? "subtask-completed" : ""}>
                {subTask.title}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <span className="no-subtasks">No sub tasks</span>
      )}

      <SubTaskForm taskId={taskId} />
    </div>
  );
}

export default SubTasks;
