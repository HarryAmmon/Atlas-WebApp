import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Column, ColumnFields } from "..";

interface ColumnGroupProps {
  title: string;
  columns?: ColumnFields[];
}

export const ColumnGroup: React.FC<ColumnGroupProps> = ({ title, columns }) => {
  return (
    <Box>
      <Typography variant="h3">{title}</Typography>
      {columns ? (
        columns.map((columnItem, index) => (
          <Column
            title={columnItem.title}
            key={index}
            stories={columnItem.stories}
          />
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};
