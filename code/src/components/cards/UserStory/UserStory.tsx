import React, { useEffect, useReducer, useState } from "react";
import { UserStoryFields, UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import styles from "./UserStory.module.scss";
import { Dialog } from "@material-ui/core";
import { BaseCard } from "..";
import { UserStoryContext } from "./services/UserStoryContext";
import axios from "axios";
import { reducer } from "./services/reducer";
import { TaskFields } from "../Task/types";
import { TaskReducer } from "../Task/services/TaskReducer";
import { BugFields } from "../Bug/types";
import { BugReducer } from "../Bug/services/BugReducer";

export const UserStory: React.FC<UserStoryProps> = ({
  userStoryId,
  className,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleOpen = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);
  let tempStory: UserStoryFields = {
    id: "",
    title: "",
    archived: false,
    tasksId: [],
    bugsId: [],
    userStoryId: "",
  };
  let tempTask: TaskFields[] = [];
  const [story, storyDispatcher] = useReducer(reducer, tempStory);

  useEffect(() => {
    axios.get(`UserStory/${userStoryId}`).then((result) => {
      storyDispatcher({ type: "ADD_NEW_USER_STORY", UserStory: result.data });
    });
  }, [userStoryId]);

  const [tasks, taskDispatcher] = useReducer(TaskReducer, tempTask);

  useEffect(() => {
    story.tasksId.forEach((id) =>
      axios.get(`/Task/${id}`).then((result) => {
        taskDispatcher({ type: "ADD_TASK", Task: result.data });
      })
    );
  }, [story.tasksId]);

  let tempBugs: BugFields[] = [];
  const [bugs, bugDispatcher] = useReducer(BugReducer, tempBugs);

  useEffect(() => {
    story.bugsId.forEach((id) =>
      axios.get(`/Bug/${id}`).then((result) => {
        bugDispatcher({ type: "ADD_BUG", Bug: result.data });
      })
    );
  }, [story.bugsId]);

  return (
    <UserStoryContext.Provider
      value={{
        userStory: story,
        userStoryDispatcher: storyDispatcher,
        tasks: tasks,
        taskDispatcher: taskDispatcher,
        bugs: bugs,
        bugDispatcher: bugDispatcher,
      }}
    >
      <BaseCard
        className={`${styles.summary} ${className}`}
        changeView={handleOpen}
        variant="UserStory"
      >
        <Summary />
      </BaseCard>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details showDetails={showDetails} handleClose={handleClose} />
      </Dialog>
    </UserStoryContext.Provider>
  );
};
