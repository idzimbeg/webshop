import React, { useContext } from "react";

import ItemOrderForm from "./ItemOrderForm";
import CartContext from "../../../store/cart-context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

const Item = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `${props.price.toFixed(2)}€`;
  const promoprice = (promotion) => {
    cartCtx.promoPrice({
      promotion: promotion,
      promoprice: props.promoprice,
    });
  };
  const theme = createTheme();

  const AddToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      discount: props.discount,
      promoprice: props.promoprice
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{ py: 8, display: "flex", flexDirection: "row" }}
        maxWidth="md"
      >
        <Grid item key={props.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              {promoprice.length > 0 ? (
                <Typography gutterBottom variant="h5" component="h2">
                  {`${props.promoprice}`}
                </Typography>
              ) : null}
              <Typography gutterBottom variant="h5" component="h2">
                {props.discount}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {price}
              </Typography>
              <ItemOrderForm onAddToCart={AddToCartHandler} />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Item;
