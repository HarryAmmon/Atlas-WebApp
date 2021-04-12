import { Box, Button, Paper, Typography } from "@material-ui/core";
import styles from "./KanBanBoard.module.scss";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { ColumnGroup, KanBanColumn, KanBanColumnFields } from "../columns";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { AppContext } from "../../views/components/AppContext";
import axios from "axios";
import { AddColumn } from "../forms";
import { BoardContext } from "./services/BoardContext";
import { BoardReducer } from "./services/BoardReducer";

interface KanBanBoardProps {
  title: string;
}

export const KanBanBoard: React.FC<KanBanBoardProps> = ({ title }) => {
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);
  const appContext = useContext(AppContext);

  let tempColumns: KanBanColumnFields[] = [];

  const [columns, kanBanDispatcher] = useReducer(BoardReducer, tempColumns);

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
    console.log("board render");
  }, []);

  useEffect(() => {
    axios.get(`/KanBanColumn`).then((result) => {
      kanBanDispatcher({ type: "ADD_EXISTING_COLUMNS", columns: result.data });
    });
  }, []);

  return (
    <BoardContext.Provider
      value={{
        KanBanColumns: columns,
        KanBanColumnDispatcher: kanBanDispatcher,
      }}
    >
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
                <KanBanColumn id={backLogColumn.columnId} addCardButton />
              </Box>
            ) : (
              <></>
            )}
            {appContext.ColumnGroups.map((columnGroup, index) => (
              <Box className={styles.columnContainer} key={columnGroup.groupId}>
                <ColumnGroup
                  groupId={columnGroup.groupId}
                  groupTitle={columnGroup.groupTitle}
                  columns={columns.filter(
                    (x) => x.groupId === columnGroup.groupId
                  )}
                  limits={columnGroup.limits}
                  exitCriteria={columnGroup.exitCriteria}
                />
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
