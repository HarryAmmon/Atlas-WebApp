import { Box, Popover, Typography } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { KanBanColumn, ColumnGroupProps } from "..";
import { MenuButton } from "../../buttons";
import { ColumnGroupMenu } from "../../menus/ColumnGroupMenu";
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

  const [
    anchorElementExitCriteria,
    setAnchorElementExitCriteria,
  ] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElementExitCriteria(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElementExitCriteria(null);
  };

  const openExitCriteria = Boolean(anchorElementExitCriteria);

  const [
    anchorElementMenuButton,
    setAnchorElementMenuButton,
  ] = useState<HTMLElement | null>(null);

  const handleMenuButtonOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElementMenuButton(event.currentTarget);
  };

  const handleMenuButtonClose = () => {
    setAnchorElementMenuButton(null);
  };

  const openMenuButton = Boolean(anchorElementMenuButton);

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
          <Typography component="h3" variant="h6">
            {groupTitle}
          </Typography>
          {exitCriteria ? (
            <Typography
              onClick={handlePopoverOpen}
              className={styles.exitIcon}
              variant="subtitle2"
            >
              <InfoOutlined fontSize="small" />
            </Typography>
          ) : (
            <></>
          )}
        </Box>
        <Typography variant="subtitle1" className={limitStyle}>
          {cardQuantity}/{limits}
        </Typography>
        <MenuButton onClick={handleMenuButtonOpen} />
      </Box>
      <Box className={styles.columnContainer}>
        {columns
          .filter((x) => x.kanBanColumn === true)
          .map((columnItem, index) => (
            <KanBanColumn
              columnId={columnItem.columnId}
              title={columnItem.title}
              visible={columnItem.visible}
              key={index}
              userStoriesId={columnItem.userStoriesId}
              kanBanColumn={columnItem.kanBanColumn}
            />
          ))}
      </Box>
      <Popover
        open={openExitCriteria}
        onClose={handlePopoverClose}
        anchorEl={anchorElementExitCriteria}
        disableRestoreFocus
      >
        <Typography className={styles.exitCriteria}>{exitCriteria}</Typography>
      </Popover>
      <Popover
        open={openMenuButton}
        onClose={handleMenuButtonClose}
        anchorEl={anchorElementMenuButton}
        disableRestoreFocus
      >
        <ColumnGroupMenu groupId={groupId} />
      </Popover>
    </Box>
  );
};
