import { BugActions, BugFields } from "../types";

export const BugReducer = (bugs: BugFields[], actions: BugActions) => {
  switch (actions.type) {
    case "ADD_BUG":
      bugs = [...bugs, actions.Bug];
      return [...bugs];
    case "SET_COMPLETED": {
      const bug = bugs.find((x) => x.id === actions.id);
      if (bug) {
        bug.completed = actions.completed;
      }
      return [...bugs];
    }
    case "UPDATE_BUG":
      const bugToUpdate = bugs.findIndex((x) => x.id === actions.Bug.id);
      if (bugToUpdate !== -1) {
        bugs.splice(bugToUpdate, 1, actions.Bug);
      }
      return [...bugs];
    default:
      return [...bugs];
  }
};
