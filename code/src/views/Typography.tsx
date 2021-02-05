import React from "react";
import { Button, Box, Card, Typography } from "@material-ui/core";

export const TypographyPage = () => (
  <React.Fragment>
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>
    <Typography variant="h6">Heading 6</Typography>
    <Typography variant="body1">Paragraph tag - body1</Typography>
    <Typography variant="body2">Paragraph tag - body 2</Typography>
    <Typography variant="subtitle1">Heading 6 - Subtitle 1</Typography>
    <Typography variant="subtitle2">Heading 6 - Subtitle 2</Typography>
    <Typography variant="caption">Span - Caption</Typography>
    <Box mt={2}>
      <Card>
        <Button variant="contained" color="primary">
          <Typography variant="button">This is variant button</Typography>
        </Button>
      </Card>
    </Box>
  </React.Fragment>
);
