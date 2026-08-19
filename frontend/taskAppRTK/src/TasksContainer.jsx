import TaskDashboard from "./TaskDashboard";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";

function TasksContainer() {
  return (
    <div className="tasks-container">
      <TaskDashboard />
      <TaskForm />
      <TaskTable />
    </div>
  );
}

export default TasksContainer;
