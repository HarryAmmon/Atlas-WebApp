import { Box, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useState } from "react";
import { ColumnGroup, ColumnGroupFields } from "../columns";

interface KanBanBoardProps {
  title: string;
}

interface boardDataFields {
  title: string;
  columnGroups: ColumnGroupFields[];
}

const boardData: boardDataFields = {
  title: "MyFirstBoard",
  columnGroups: [
    {
      title: "Column Group 1",
      columns: [
        {
          title: "Doing",
          stories: [
            { title: "kanban test 1", archived: false, storyId: "1" },
            { title: "kanban test 2", archived: false, storyId: "222" },
          ],
        },
        {
          title: "Done",
          stories: [
            { title: "kanban test 1", archived: false, storyId: "11123" },
            { title: "kanban test 2", archived: false, storyId: "3313" },
          ],
        },
      ],
    },
    {
      title: "Column Group 2",
      columns: [
        {
          title: "Doing",
          stories: [
            { title: "kanban test 1", archived: false, storyId: "9687" },
            { title: "kanban test 2", archived: false, storyId: "2" },
          ],
        },
        {
          title: "Done",
          stories: [
            { title: "kanban test 1", archived: false, storyId: "1" },
            { title: "kanban test 2", archived: false, storyId: "2" },
          ],
        },
      ],
    },
  ],
};

export const KanBanBoard: React.FC<KanBanBoardProps> = ({ title }) => {
  const [columnGroups] = useState<ColumnGroupFields[]>(boardData.columnGroups);
  return (
    <Paper>
      <Typography variant="h2">{title}</Typography>
      <Box className={styles.root}>
        {columnGroups.map((columnGroup, index) => (
          <ColumnGroup
            title={columnGroup.title}
            columns={columnGroup.columns}
          />
        ))}
      </Box>
    </Paper>
  );
};
