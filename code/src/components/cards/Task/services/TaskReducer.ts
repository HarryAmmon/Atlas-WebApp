import { TaskActions, TaskFields } from "../types";

export const TaskReducer = (Tasks: TaskFields[], action: TaskActions) => {
  switch (action.type) {
    case "SET_COMPLETED":
      const task = Tasks.find((x) => x.id === action.id);
      if (task) {
        task.completed = action.completed;
      }
      return [...Tasks];
    case "ADD_TASK":
      Tasks = [...Tasks, action.Task];
      return [...Tasks];
    case "UPDATE_TASK":
      let taskToUpdate = Tasks.findIndex((x) => x.id === action.Task.id);
      if (taskToUpdate !== -1) {
        Tasks.splice(taskToUpdate, 1, action.Task);
      }
      return [...Tasks];
    default:
      return [...Tasks];
  }
};
