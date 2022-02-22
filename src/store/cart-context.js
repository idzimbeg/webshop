import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  discounts: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  // discountTotal: (discount) => {},
  // promoPrice: (promoprice) => {},
});

export default CartContext;
