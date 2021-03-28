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
              key={index}
              groupId={columnGroup.groupId}
              groupTitle={columnGroup.groupTitle}
              columns={appContext.Columns.filter(
                (x) => x.groupId === columnGroup.groupId
              )}
              limits={columnGroup.limits}
              exitCriteria={columnGroup.exitCriteria}
            />
          ))}
        </Box>
      </DragDropContext>
    </Paper>
  );
};
