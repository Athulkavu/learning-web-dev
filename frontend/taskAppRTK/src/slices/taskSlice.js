import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      title: "Learn React components",
      isCompleted: true,
      subTasks: [
        {
          id: 101,
          title: "Read about functional components",
          isCompleted: true,
        },
        {
          id: 102,
          title: "Practice component composition",
          isCompleted: false,
        },
      ],
    },
    {
      id: 2,
      title: "Understand props",
      isCompleted: true,
      subTasks: [
        { id: 201, title: "Pass primitive values", isCompleted: true },
        { id: 202, title: "Pass objects and arrays", isCompleted: true },
      ],
    },
    {
      id: 3,
      title: "Build task table",
      isCompleted: false,
      subTasks: [
        { id: 301, title: "Create table header", isCompleted: true },
        { id: 302, title: "Render task rows", isCompleted: false },
      ],
    },
    {
      id: 4,
      title: "Create task form",
      isCompleted: false,
      subTasks: [],
    },
    {
      id: 5,
      title: "Review application",
      isCompleted: false,
      subTasks: [
        { id: 501, title: "Check responsive layout", isCompleted: false },
      ],
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Number(new Date()),
        title: action.payload.title,
        isCompleted: action.payload.isCompleted,
        subTasks: [],
      };
      state.data.push(newTask);
    },
    updateTask: (state, action) => {
      const task = state.data.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.isCompleted = action.payload.isCompleted;
      }
    },
    removeTask: (state, action) => {
      const index = state.data.findIndex((t) => t.id === action.payload);
      if (index !== -1) state.data.splice(index, 1);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.data.find((t) => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        task.subTasks.forEach((subTask) => {
          subTask.isCompleted = task.isCompleted;
        });
      }
    },
    toggleAllTasks: (state, action) => {
      state.data.forEach((task) => {
        task.isCompleted = action.payload;
        task.subTasks.forEach((subTask) => {
          subTask.isCompleted = action.payload;
        });
      });
    },
    addSubTask: (state, action) => {
      const task = state.data.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.subTasks.push({
          id: Number(new Date()),
          title: action.payload.title,
          isCompleted: false,
        });
        task.isCompleted = false;
      }
    },
    toggleSubTaskStatus: (state, action) => {
      const task = state.data.find((t) => t.id === action.payload.taskId);
      if (task) {
        const subTask = task.subTasks.find(
          (st) => st.id === action.payload.subTaskId
        );
        if (subTask) {
          subTask.isCompleted = !subTask.isCompleted;
        }

        if (task.subTasks.length > 0) {
          task.isCompleted = task.subTasks.every((st) => st.isCompleted);
        }
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  removeTask,
  toggleTaskStatus,
  toggleAllTasks,
  addSubTask,
  toggleSubTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
