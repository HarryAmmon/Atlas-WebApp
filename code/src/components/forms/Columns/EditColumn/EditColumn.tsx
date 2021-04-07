import axios from "axios";
import React, { useContext } from "react";
import { AbstractColumn } from "../..";
import { AppContext } from "../../../../views/components/AppContext";

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
  const appContext = useContext(AppContext);
  const columnGroup = appContext.ColumnGroups.find(
    (x) => x.groupId === groupId
  );

  const handleSubmit = (values: any) => {
    console.log({ values });
    axios
      .put(`/ColumnGroup/${groupId}`, {
        groupTitle: values.GroupTitle,
        exitCriteria: values.ExitCriteria,
        groupId: groupId,
        limits: values.WIPLimit,
      })
      .then((result) =>
        appContext.ColumnGroupsDispatcher({
          type: "EDIT_COLUMN_GROUP",
          ColumnGroup: {
            groupTitle: values.GroupTitle,
            exitCriteria: values.ExitCriteria,
            groupId: groupId,
            limits: values.WIPLimit,
          },
        })
      );
  };
  if (columnGroup !== undefined) {
    return (
      <AbstractColumn
        title="Edit"
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
