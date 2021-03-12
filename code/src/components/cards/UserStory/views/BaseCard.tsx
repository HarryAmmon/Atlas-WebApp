import React from "react";
import { Card } from "@material-ui/core";
import { BaseCardProps } from "../types";
import styles from "./BaseCard.module.scss";

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className,
  changeView,
}) => (
  <Card className={`${styles.root} ${className}`} onClick={changeView}>
    {children}
  </Card>
);
