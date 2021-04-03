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
      count += column.userStoriesId.length;
    });

    setCardQuantity(count);
    if (count < limits) {
      setLimitStyle(styles.limits_safe);
    } else if (count === limits) {
      setLimitStyle(styles.limits_warning);
    } else {
      setLimitStyle(styles.limits_danger);
    }
  }, [columns, limits]);

  return (
    <Box className={styles.root}>
      <Box className={styles.columnGroupBar}>
        <Box className={styles.titleAndExit}>
          <Typography component="h3" variant="h5">
            {groupTitle}
          </Typography>
          <Typography
            onClick={handlePopoverOpen}
            className={styles.exitIcon}
            variant="subtitle2"
          >
            <InfoOutlined fontSize="small" />
          </Typography>
        </Box>
        <Typography variant="subtitle1" className={limitStyle}>
          {cardQuantity}/{limits}
        </Typography>
      </Box>
      <Box className={styles.columnContainer}>
        {columns.map((columnItem, index) => (
          <Column
            columnId={columnItem.columnId}
            groupId={columnItem.groupId}
            title={columnItem.title}
            key={index}
            userStoriesId={columnItem.userStoriesId}
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
