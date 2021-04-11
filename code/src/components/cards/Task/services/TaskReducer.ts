import { TaskActions, TaskFields } from "../types";

export const TaskReducer = (Tasks: TaskFields[], action: TaskActions) => {
  switch (action.type) {
    case "SET_COMPLETED":
      console.log("In set completed");
      const task = Tasks.find((x) => x.id === action.id);
      if (task) {
        task.completed = action.completed;
      }
      return [...Tasks];
    default:
      return [...Tasks];
  }
};
