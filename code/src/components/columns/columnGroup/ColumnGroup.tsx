import { Box, Popover, Typography } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Column, ColumnGroupProps } from "..";
import styles from "./ColumnGroup.module.scss";

export const ColumnGroup: React.FC<ColumnGroupProps> = ({
  groupTitle,
  columns,
  limits,
  exitCriteria,
  groupId,
}) => {
  const [cardQuantity, setCardQuantity] = useState<number>();
  const [limitStyle, setLimitStyle] = useState<string>("");
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);

  useEffect(() => {
    let count = 0;
    columns.forEach((column) => {
      count += column.stories.length;
    });
    setCardQuantity(count);
    if (count < Number(limits)) {
      setLimitStyle(styles.limits_safe);
    } else if (count === Number(limits)) {
      setLimitStyle(styles.limits_warning);
    } else {
      setLimitStyle(styles.limits_danger);
    }
  }, [columns, limits]);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <Box className={styles.root}>
      <Box className={styles.columnGroupBar}>
        <Typography component="h3" variant="h5">
          {groupTitle}
        </Typography>
        <Box className={styles.exitAndLimits}>
          <Typography variant="subtitle1" className={limitStyle}>
            {cardQuantity}/{limits}
          </Typography>
          <Typography onClick={handlePopoverOpen} className={styles.exitIcon}>
            <InfoOutlined />
          </Typography>
        </Box>
      </Box>
      <Box className={styles.columnContainer}>
        {columns.map((columnItem, index) => (
          <Column
            columnId={columnItem.columnId}
            groupId={columnItem.groupId}
            columnTitle={columnItem.columnTitle}
            columnGroupTitle="X"
            key={index}
            stories={columnItem.stories}
          />
        ))}
      </Box>
      <Popover
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorElement}
        disableRestoreFocus
      >
        <Typography className={styles.exitCriteria}>{exitCriteria}</Typography>
      </Popover>
    </Box>
  );
};
