import React, { useState } from "react";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";

export interface UserStoryProps {
  title: string;
  description?: string;
  id: string;
  changeView?: () => void;
}

export const UserStory: React.FC<UserStoryProps> = ({ title, id }) => {
  const [view, setView] = useState<"summary" | "detail">("summary");
  switch (view) {
    case "summary":
      return (
        <Summary title={title} id={id} changeView={() => setView("detail")} />
      );
    case "detail":
      return <Details title={title} id={id} />;
  }
};
