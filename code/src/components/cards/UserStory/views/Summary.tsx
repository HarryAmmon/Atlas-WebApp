import { Box, CardHeader, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { SummaryProps } from "../types";
import styles from "../../Summary.module.scss";
import { UserStoryContext } from "../services/UserStoryContext";
import { ProgressBar } from "../../../progressbar/ProgressBar";

export const Summary: React.FC<SummaryProps> = () => {
  const UserStory = useContext(UserStoryContext);

  useEffect(() => {
    console.log(UserStory.userStory.title, UserStory.tasks);
  }, [UserStory]);

  return (
    <Box>
      <CardHeader
        title={UserStory.userStory.title}
        titleTypographyProps={{ variant: "body2" }}
        className={styles.root}
      />
      {UserStory.tasks.length > 0 ? (
        <Box>
          <Typography variant="body1">Tasks</Typography>
          <ProgressBar
            maxValue={UserStory.tasks.length}
            value={UserStory.tasks.filter((x) => x.completed === true).length}
          />
        </Box>
      ) : (
        <></>
      )}
      {UserStory.bugs.length > 0 ? (
        <>
          <Box>
            <Typography variant="body1">Bugs</Typography>
            <ProgressBar
              maxValue={UserStory.bugs.length}
              value={UserStory.bugs.filter((x) => x.completed === true).length}
            />
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
