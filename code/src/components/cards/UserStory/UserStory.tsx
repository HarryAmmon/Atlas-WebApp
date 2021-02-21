import React, { useState } from "react";
import { UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";

export const UserStory: React.FC<UserStoryProps> = ({
  id,
  title,
  description,
}) => {
  const [view, setView] = useState<"summary" | "detail">("detail");
  switch (view) {
    case "summary":
      return (
        <Summary title={title} id={id} changeView={() => setView("detail")} />
      );
    case "detail":
      return <Details title={title} id={id} description={description} />;
  }
};
