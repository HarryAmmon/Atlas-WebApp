import React, { ReactNode } from "react";
import styles from "./typography.module.scss";

interface UlProps {
  children: ReactNode;
}

export const Ul: React.FC<UlProps> = ({ children }) => (
  <ul className={styles.unorderedList}>{children}</ul>
);

interface LiProps extends UlProps {}

export const Li: React.FC<LiProps> = ({ children }) => (
  <li className={styles.listItem}>{children}</li>
);
