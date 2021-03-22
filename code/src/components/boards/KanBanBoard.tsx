import { Box, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useState } from "react";
import { ColumnGroup, ColumnGroupFields } from "../columns";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
          columnTitle: "Doing",
          columnId: "1",
          stories: [
            { title: "kanban test 1", archived: false, storyId: "1" },
            { title: "kanban test 2", archived: false, storyId: "222" },
          ],
        },
        {
          columnTitle: "Done",
          columnId: "2",
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
          columnTitle: "Doing",
          columnId: "3",
          stories: [
            { title: "kanban test 1", archived: false, storyId: "9687" },
          ],
        },
        {
          columnTitle: "Done",
          columnId: "4",
        },
      ],
    },
  ],
};

const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
  console.group();
  console.log(source);
  console.log(destination);
  console.log(draggableId);

  if (destination === null || source === null) {
    console.log("Destination was null");
    // return;
  } else if (source.droppableId === destination?.droppableId) {
    console.log("Card dropped in the same list");
    // return;
  } else {
    console.log("Card dropped into a new list");
  }
  console.groupEnd();
};

export const KanBanBoard: React.FC<KanBanBoardProps> = ({ title }) => {
  const [columnGroups] = useState<ColumnGroupFields[]>(boardData.columnGroups);
  return (
    <Paper>
      <Typography variant="h2">{title}</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box className={styles.root}>
          {columnGroups.map((columnGroup, index) => (
            <ColumnGroup
              title={columnGroup.title}
              columns={columnGroup.columns}
            />
          ))}
        </Box>
      </DragDropContext>
    </Paper>
  );
};
