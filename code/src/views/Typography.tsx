import React from "react";
import {
  Button,
  Card,
  Typography,
  CardHeader,
  Divider,
  Box,
} from "@material-ui/core";
import { CardTitle } from "../components/forms";

export const TypographyPage = () => (
  <React.Fragment>
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>
    <Typography variant="h6">Heading 6</Typography>
    <Typography variant="subtitle1">Heading 6 - Subtitle 1</Typography>
    <Typography variant="subtitle2">Heading 6 - Subtitle 2</Typography>
    <Typography variant="body1">Paragraph tag - body1</Typography>
    <Typography variant="body2">Paragraph tag - body 2</Typography>
    <Typography variant="caption">Span - Caption</Typography>
    <Typography variant="button">Span - Button</Typography>
    <Typography variant="overline">Span - Overline</Typography>
    <Box display="flex" justifyContent="space-evenly">
      <Card>
        <CardHeader title="A title" subheader={"My Subheader"} />
        <Button variant="contained" color="primary">
          Primary button
        </Button>
      </Card>
      <Card>
        <CardHeader title="Second title" subheader={"My Subheader"} />
        <Button variant="contained" color="primary">
          Primary button
        </Button>
      </Card>
    </Box>

    <Box my={3}>
      <Divider />
    </Box>
    <Box my={2}>
      <CardTitle>My Title</CardTitle>
    </Box>
  </React.Fragment>
);
