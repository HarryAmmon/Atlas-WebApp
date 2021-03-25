import { Box, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useContext } from "react";
import { ColumnGroup } from "../columns";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { AppContext } from "../../views/components/AppContext";

interface KanBanBoardProps {
  title: string;
}

export const KanBanBoard: React.FC<KanBanBoardProps> = ({ title }) => {
  const appContext = useContext(AppContext);

  const handleDragEnd = ({ source, destination }: DropResult) => {
    // if (destination === null || source === null) {
    //   return;
    // } else if (source.droppableId === destination?.droppableId) {
    //   const sourceColumn = appContext.Columns.find(
    //     (x) => x.columnId === source.droppableId
    //   );
    //   const removedCard = sourceColumn?.stories.splice(source.index, 1);
    //   if (removedCard !== undefined) {
    //     sourceColumn?.stories.splice(destination.index, 0, removedCard[0]);
    //   }
    // } else {
    //   appContext.ColumnsDispatcher({type: "MOVE_CARD_IN_SAME_COLUMN", Card})

    //   const movedCard = sourceColumn?.stories.splice(source.index, 1);
    //   if (destination?.index !== undefined && movedCard !== undefined) {
    //     destinationColumn?.stories?.splice(destination?.index, 0, movedCard[0]);
    //   }
    // }
    appContext.ColumnsDispatcher({
      type: "MOVE_CARD",
      CardSource: source,
      CardDestination: destination,
    });
  };

  return (
    <Paper>
      <Typography variant="h2">{title}</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box className={styles.root}>
          {appContext.ColumnGroups.map((columnGroup, index) => (
            <ColumnGroup
              id={columnGroup.groupId}
              title={columnGroup.groupTitle}
              columns={appContext.Columns.filter(
                (x) => x.groupId === columnGroup.groupId
              )}
            />
          ))}
        </Box>
      </DragDropContext>
    </Paper>
  );
};
