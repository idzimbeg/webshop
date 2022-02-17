import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap>
            Basket
          </Typography>
          <HeaderCartButton onClick={props.onShowCart} />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
