import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CardContent,
  Card,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";

const CardDisplay = (props) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={2}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row-wrap",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>{props.children}</CardContent>
            </Card>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default CardDisplay;
