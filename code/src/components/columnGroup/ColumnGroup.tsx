import { Box, Popover, Typography } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../boards/services/BoardContext";

import { MenuButton } from "../buttons";
import { KanBanColumn } from "../kanBanColumn";
import { ColumnGroupMenu } from "../menus/ColumnGroupMenu";
import styles from "./ColumnGroup.module.scss";
import { ColumnGroupProps } from "./types/ColumnGroupTypes";

export const ColumnGroup: React.FC<ColumnGroupProps> = ({ id }) => {
  const [cardQuantity, setCardQuantity] = useState<number>();
  const [limitStyle, setLimitStyle] = useState<string>("");

  const boardContext = useContext(BoardContext);
  const columnGroup = boardContext.ColumnGroups.find((x) => x.groupId === id);
  const childColumns = boardContext.KanBanColumns.filter(
    (x) => x.groupId === id
  ).filter((x) => x.kanBanColumn === true);

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
    childColumns.forEach((column) => {
      count += column.userStoriesId.length;
    });

    setCardQuantity(count);
    if (columnGroup !== undefined) {
      if (count < columnGroup.limits) {
        setLimitStyle(styles.limits_safe);
      } else if (count === columnGroup.limits) {
        setLimitStyle(styles.limits_warning);
      } else {
        setLimitStyle(styles.limits_danger);
      }
    }
  }, [columnGroup, childColumns]);
  if (columnGroup) {
    return (
      <Box className={styles.root}>
        <Box className={styles.columnGroupBar}>
          <Box className={styles.titleAndExit}>
            <Typography component="h3" variant="h6">
              {columnGroup.groupTitle}
            </Typography>
            {columnGroup.exitCriteria ? (
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
            {cardQuantity}/{columnGroup.limits}
          </Typography>
          <MenuButton onClick={handleMenuButtonOpen} />
        </Box>
        <Box className={styles.columnContainer}>
          {boardContext.KanBanColumns.filter(
            (x) => x.groupId === columnGroup.groupId
          )
            .filter((x) => x.kanBanColumn === true)
            .map((columnItem, index) => (
              <KanBanColumn
                id={columnItem.columnId}
                key={columnItem.columnId}
              />
            ))}
        </Box>
        <Popover
          open={openExitCriteria}
          onClose={handlePopoverClose}
          anchorEl={anchorElementExitCriteria}
          disableRestoreFocus
        >
          <Typography className={styles.exitCriteria}>
            {columnGroup.exitCriteria}
          </Typography>
        </Popover>
        <Popover
          open={openMenuButton}
          onClose={handleMenuButtonClose}
          anchorEl={anchorElementMenuButton}
          disableRestoreFocus
        >
          <ColumnGroupMenu groupId={columnGroup.groupId} />
        </Popover>
      </Box>
    );
  } else {
    return <></>;
  }
};
