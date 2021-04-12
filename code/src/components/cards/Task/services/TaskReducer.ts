import { TaskActions, TaskFields } from "../types";

export const TaskReducer = (Task: TaskFields, action: TaskActions) => {
  switch (action.type) {
    case "SET_COMPLETED":
      Task.completed = action.completed;
      return { ...Task };
    case "ADD_TASK":
      Task = action.Task;
      return { ...Task };
    case "UPDATE_TASK":
      Task = action.Task;
      return { ...Task };
    default:
      return { ...Task };
  }
};
