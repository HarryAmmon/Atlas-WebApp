import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Column, ColumnFields } from "..";
import styles from "./ColumnGroup.module.scss";

interface ColumnGroupProps {
  title: string;
  id: string;
  columns?: ColumnFields[];
}

export const ColumnGroup: React.FC<ColumnGroupProps> = ({ title, columns }) => {
  return (
    <Box className={styles.root}>
      <Typography component="h3" variant="h5">
        {title}
      </Typography>
      <Box className={styles.columnContainer}>
        {columns ? (
          columns.map((columnItem, index) => (
            <Column
              columnId={columnItem.columnId}
              groupId={columnItem.groupId}
              columnTitle={columnItem.columnTitle}
              columnGroupTitle="X"
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
