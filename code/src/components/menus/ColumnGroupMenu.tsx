import { Box } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../views/components/AppContext";
import { DeleteButton } from "../buttons/DeleteButton/DeleteButton";
import { EditButton } from "../buttons/EditButton/EditButton";
import { EditColumn } from "../forms";
import styles from "./ColumnGroupMenu.module.scss";

export interface ColumnGroupProps {
  groupId: string;
}

export const ColumnGroupMenu: React.FC<ColumnGroupProps> = ({ groupId }) => {
  const appContext = useContext(AppContext);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const handleDelete = () => {
    axios.delete(`/ColumnGroup/${groupId}`).then((result) => {
      const columns = appContext.Columns.filter((x) => x.groupId === groupId);
      if (columns) {
        columns.forEach((column) =>
          appContext.ColumnsDispatcher({
            type: "DELETE_COLUMN",
            ColumnId: column.columnId,
          })
        );
      }
      appContext.ColumnGroupsDispatcher({
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
