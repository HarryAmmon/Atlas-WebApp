import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Column, ColumnFields } from "..";
import styles from "./ColumnGroup.module.scss";

interface ColumnGroupProps {
  title: string;
  columns?: ColumnFields[];
}

export const ColumnGroup: React.FC<ColumnGroupProps> = ({ title, columns }) => {
  return (
    <Box className={styles.root}>
      <Typography variant="h3">{title}</Typography>
      <Box className={styles.columnContainer}>
        {columns ? (
          columns.map((columnItem, index) => (
            <Column
              columnId={columnItem.columnId}
              columnGroupTitle={title}
              columnTitle={columnItem.columnTitle}
              key={index}
              stories={columnItem.stories}
            />
          ))
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
