import { Box, Button, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useContext, useState } from "react";
import { ColumnGroup, KanBanColumn } from "../columns";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { AppContext } from "../../views/components/AppContext";
import axios from "axios";
import { AddColumn } from "../forms";

interface KanBanBoardProps {
  title: string;
}

export const KanBanBoard: React.FC<KanBanBoardProps> = ({ title }) => {
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  const backLogColumn = appContext.Columns.find(
    (x) => x.title === "Backlog" && x.kanBanColumn === false
  );
  const doneColumn = appContext.Columns.find(
    (x) => x.title === "Done" && x.kanBanColumn === false
  );
  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (source !== null && destination !== null) {
      appContext.ColumnsDispatcher({
        type: "MOVE_CARD",
        CardSource: source,
        CardDestination: destination,
      });
      axios.put(`KanBanColumn/${destination?.droppableId}`, {
        source,
        destination,
      });
    }
  };

  return (
    <Paper>
      <Box className={styles.boardMenuBar}>
        <Typography variant="h2">{title}</Typography>
        <Button
          type="button"
          onClick={() => {
            setDisplayPopUp(!displayPopUp);
          }}
        >
          Add Column
        </Button>
        <AddColumn display={displayPopUp} setDisplay={setDisplayPopUp} />
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box className={styles.root}>
          {backLogColumn ? (
            <Box className={styles.columnContainer}>
              <KanBanColumn
                title={backLogColumn?.title}
                columnId={backLogColumn?.columnId}
                userStoriesId={backLogColumn?.userStoriesId}
                kanBanColumn={backLogColumn?.kanBanColumn}
                visible
                addCardButton
              />
            </Box>
          ) : (
            <></>
          )}

          {appContext.ColumnGroups.map((columnGroup, index) => (
            <Box className={styles.columnContainer} key={columnGroup.groupId}>
              <ColumnGroup
                groupId={columnGroup.groupId}
                groupTitle={columnGroup.groupTitle}
                columns={appContext.Columns.filter(
                  (x) => x.groupId === columnGroup.groupId
                )}
                limits={columnGroup.limits}
                exitCriteria={columnGroup.exitCriteria}
              />
            </Box>
          ))}
          {doneColumn ? (
            <Box className={styles.columnContainer}>
              <KanBanColumn
                title={doneColumn?.title}
                columnId={doneColumn?.columnId}
                userStoriesId={doneColumn?.userStoriesId}
                kanBanColumn={doneColumn?.kanBanColumn}
                visible
              />
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </DragDropContext>
    </Paper>
  );
};
