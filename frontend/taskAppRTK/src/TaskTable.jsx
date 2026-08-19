
import { useSelector, useDispatch } from "react-redux";
import { toggleAllTasks } from "./slices/taskSlice";
import TaskRow from "./TaskRow";

function TaskTable() {
  const tasks = useSelector((state) => state.tasks.data);
  const dispatch = useDispatch();

  const allCompleted =
    tasks.length > 0 && tasks.every((task) => task.isCompleted);

  const handleMarkAllComplete = () => {
    dispatch(toggleAllTasks(!allCompleted));
  };

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>
            <div className="complete-all">
              <input
                type="checkbox"
                checked={allCompleted}
                onChange={handleMarkAllComplete}
              />
              <span>{allCompleted ? "Unmark All" : "Complete"}</span>
            </div>
          </th>
          <th>Sub Tasks</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
