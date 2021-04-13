import { Box } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BoardContext } from "../boards/services/BoardContext";
import { DeleteButton } from "../buttons/DeleteButton/DeleteButton";
import { EditButton } from "../buttons/EditButton/EditButton";
import { EditColumn } from "../forms";
import styles from "./ColumnGroupMenu.module.scss";

export interface ColumnGroupProps {
  groupId: string;
}

export const ColumnGroupMenu: React.FC<ColumnGroupProps> = ({ groupId }) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const boardContext = useContext(BoardContext);

  const handleDelete = () => {
    axios.delete(`/ColumnGroup/${groupId}`).then((result) => {
      const columns = boardContext.KanBanColumns.filter(
        (x) => x.groupId === groupId
      );
      if (columns) {
        columns.forEach((column) =>
          boardContext.KanBanColumnDispatcher({
            type: "DELETE_COLUMN",
            ColumnId: column.columnId,
          })
        );
      }
      boardContext.ColumnGroupsDispatcher({
        type: "REMOVE_COLUMN_GROUP",
        ColumnGroupId: groupId,
      });
    });
  };

  return (
    <Box className={styles.root}>
      <EditButton onClick={() => setShowEdit(true)} />
      <EditColumn
        display={showEdit}
        setDisplay={setShowEdit}
        groupId={groupId}
      />
      <DeleteButton onClick={handleDelete} />
    </Box>
  );
};
