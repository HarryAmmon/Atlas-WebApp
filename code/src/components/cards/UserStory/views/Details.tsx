import React from "react";
import { UserStoryProps } from "../..";

export const Details: React.FC<UserStoryProps> = ({ id }) => {
  return <h1> The Details view {id}</h1>;
};
