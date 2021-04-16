import { Box, Button, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useEffect, useReducer, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import { AddColumn } from "../forms";
import { BoardContext } from "./services/BoardContext";
import { KanBanColumnReducer } from "../kanBanColumn/services/KanBanColumnReducer";
import { KanBanColumn, KanBanColumnFields } from "../kanBanColumn";
import {
  ColumnGroup,
  ColumnGroupFields,
  ColumnGroupReducer,
} from "../columnGroup";

interface KanBanBoardProps {
  title: string;
}

export const KanBanBoard: React.FC<KanBanBoardProps> = ({ title }) => {
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);

  let tempColumns: KanBanColumnFields[] = [];
  let tempColumnGroups: ColumnGroupFields[] = [];

  const [columns, kanBanDispatcher] = useReducer(
    KanBanColumnReducer,
    tempColumns
  );

  const [columnGroups, columnGroupDispatcher] = useReducer(
    ColumnGroupReducer,
    tempColumnGroups
  );

  const backLogColumn = columns.find(
    (x) => x.title === "Backlog" && x.kanBanColumn === false
  );
  const doneColumn = columns.find(
    (x) => x.title === "Done" && x.kanBanColumn === false
  );
  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (source !== null && destination !== null) {
      kanBanDispatcher({
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

  useEffect(() => {
    axios.get(`/KanBanColumn`).then((result) => {
      kanBanDispatcher({ type: "ADD_EXISTING_COLUMNS", columns: result.data });
    });
    axios.get("/ColumnGroup").then((result) => {
      columnGroupDispatcher({
        type: "ADD_COLUMN_GROUPS",
        ColumnGroups: result.data,
      });
    });
  }, []);

  return (
    <BoardContext.Provider
      value={{
        KanBanColumns: columns,
        KanBanColumnDispatcher: kanBanDispatcher,
        ColumnGroups: columnGroups,
        ColumnGroupsDispatcher: columnGroupDispatcher,
      }}
    >
      <Paper>
        <Box className={styles.boardMenuBar}>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
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
                <KanBanColumn id={backLogColumn.columnId} addCardButton />
              </Box>
            ) : (
              <></>
            )}
            {columnGroups.map((columnGroup, index) => (
              <Box className={styles.columnContainer} key={columnGroup.groupId}>
                <ColumnGroup id={columnGroup.groupId} />
              </Box>
            ))}
            {doneColumn ? (
              <Box className={styles.columnContainer}>
                <KanBanColumn id={doneColumn.columnId} />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </DragDropContext>
      </Paper>
    </BoardContext.Provider>
  );
};
