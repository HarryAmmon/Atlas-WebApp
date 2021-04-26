import axios from "axios";
import React, { useContext } from "react";
import { AbstractColumn } from "../..";
import { BoardContext } from "../../../boards/services/BoardContext";

export interface EditColumnProps {
  display: boolean;
  setDisplay: (state: boolean) => void;
  groupId: string;
}

export const EditColumn: React.FC<EditColumnProps> = ({
  display,
  setDisplay,
  groupId,
}) => {
  const boardContext = useContext(BoardContext);
  const columnGroup = boardContext.ColumnGroups.find(
    (x) => x.groupId === groupId
  );

  const handleSubmit = (values: any) => {
    axios
      .put(`/ColumnGroup/${groupId}`, {
        groupTitle: values.GroupTitle,
        exitCriteria: values.ExitCriteria,
        groupId: groupId,
        limits: values.WIPLimit,
      })
      .then((result) =>
        boardContext.ColumnGroupsDispatcher({
          type: "EDIT_COLUMN_GROUP",
          ColumnGroup: {
            groupTitle: values.GroupTitle,
            exitCriteria: values.ExitCriteria,
            groupId: groupId,
            limits: values.WIPLimit,
          },
        })
      );
    setDisplay(false);
  };
  if (columnGroup !== undefined) {
    return (
      <AbstractColumn
        title="Edit"
        button="Save"
        display={display}
        setDisplay={setDisplay}
        handleSubmit={handleSubmit}
        initialValues={{
          exitCriteria: columnGroup.exitCriteria,
          groupTitle: columnGroup.groupTitle,
          limits: columnGroup.limits,
          groupId: groupId,
        }}
      />
    );
  } else {
    return <></>;
  }
};
