import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  discounts: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  discountTotal: (discount) => {}
});

export default CartContext;
