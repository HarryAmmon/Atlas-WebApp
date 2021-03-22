import { Box, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useState } from "react";
import { ColumnFields, ColumnGroup, ColumnGroupFields } from "../columns";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface KanBanBoardProps {
  title: string;
}

interface boardDataFields {
  title: string;
  columns: ColumnFields[];
  columnGroups: ColumnGroupFields[];
}

const boardData: boardDataFields = {
  title: "MyFirstBoard",
  columns: [
    {
      columnId: "1",
      columnTitle: "Doing",
      groupId: "1",
      stories: [
        { title: "kanban test 1", archived: false, storyId: "1" },
        { title: "kanban test 2", archived: false, storyId: "222" },
      ],
    },
    {
      columnId: "2",
      columnTitle: "Done",
      groupId: "1",
      stories: [
        { title: "kanban test 1", archived: false, storyId: "11123" },
        { title: "kanban test 2", archived: false, storyId: "3313" },
      ],
    },
    {
      columnId: "3",
      columnTitle: "Doing",
      groupId: "2",
      stories: [{ title: "kanban test 1", archived: false, storyId: "9687" }],
    },
    {
      columnId: "4",
      columnTitle: "Done",
      groupId: "2",
      stories: [],
    },
  ],
  columnGroups: [
    {
      groupId: "1",
      groupTitle: "Column Group 1",
    },
    { groupId: "2", groupTitle: "Column Group 2" },
  ],
};

const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
  if (destination === null || source === null) {
    return;
  } else if (source.droppableId === destination?.droppableId) {
    const column = boardData.columns.find(
      (x) => x.columnId === source.droppableId
    );
    const removedCard = column?.stories?.splice(source.index, 1);
    if (removedCard !== undefined) {
      column?.stories?.splice(destination.index, 0, removedCard[0]);
    }
  } else {
    const sourceColumn = boardData.columns.find(
      (x) => x.columnId === source.droppableId
    );
    const destinationColumn = boardData.columns.find(
      (x) => x.columnId === destination?.droppableId
    );
    const movedCard = sourceColumn?.stories?.splice(source.index, 1);
    if (destination?.index !== undefined && movedCard !== undefined) {
      destinationColumn?.stories?.splice(destination?.index, 0, movedCard[0]);
    }
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
              id={columnGroup.groupId}
              title={columnGroup.groupTitle}
              columns={boardData.columns.filter(
                (x) => x.groupId === columnGroup.groupId
              )}
            />
          ))}
        </Box>
      </DragDropContext>
    </Paper>
  );
};
