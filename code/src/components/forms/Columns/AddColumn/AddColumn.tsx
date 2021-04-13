import axios from "axios";
import React, { useContext } from "react";
import { BoardContext } from "../../../boards/services/BoardContext";
import { AbstractColumn } from "../AbstractColumnForm/AbstractColumn";

export interface AddColumnProps {
  display: boolean;
  setDisplay: (state: boolean) => void;
}

export const AddColumn: React.FC<AddColumnProps> = ({
  display,
  setDisplay,
}) => {
  const boardContext = useContext(BoardContext);
  const handleSubmit = (values: any) => {
    axios
      .post("/ColumnGroup", {
        GroupTitle: values.GroupTitle,
        ExitCriteria: values.ExitCriteria,
        Limits: values.WIPLimit,
      })
      .then((result) => {
        console.log({ result });
        boardContext.ColumnGroupsDispatcher({
          type: "ADD_COLUMN_GROUP",
          ColumnGroup: {
            groupTitle: result.data[0].groupTitle,
            limits: result.data[0].limits,
            exitCriteria: result.data[0].exitCriteria,
            groupId: result.data[0].groupId,
          },
        });

        boardContext.KanBanColumnDispatcher({
          type: "ADD_NEW_COLUMN",
          column: {
            title: result.data[1].title,
            groupId: result.data[1].groupId,
            userStoriesId: result.data[1].userStoriesId,
            columnId: result.data[1].columnId,
            visible: result.data[1].visible,
            kanBanColumn: true,
          },
        });

        boardContext.KanBanColumnDispatcher({
          type: "ADD_NEW_COLUMN",
          column: {
            title: result.data[2].title,
            groupId: result.data[2].groupId,
            userStoriesId: result.data[2].userStoriesId,
            columnId: result.data[2].columnId,
            visible: result.data[2].visible,
            kanBanColumn: true,
          },
        });
      })
      .catch((err: any) => console.log(err));
    setDisplay(false);
  };
  return (
    <AbstractColumn
      title="Add"
      display={display}
      setDisplay={setDisplay}
      handleSubmit={handleSubmit}
    />
  );
};
