import { CardHeader } from "@material-ui/core";
import React, { useEffect } from "react";
import { useGetUserStory } from "../services/useGetUserStory";
import { ViewProps } from "../types";

export const Summary: React.FC<ViewProps> = ({ userStoryId }) => {
  const UserStory = useGetUserStory(userStoryId);

  useEffect(() => {
    console.log(UserStory);
  }, [UserStory]);

  return (
    <CardHeader
      title={UserStory.title}
      titleTypographyProps={{ variant: "h6" }}
    />
  );
};
