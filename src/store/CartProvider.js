import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  discount: 0,
  promoprice: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  // if (action.type === "DISCOUNT") {
  //   const discountPrice = state.totalAmount * action.items.discount.amount;
  //   return {
  //     totalAmount: discountPrice,
  //   };
  // }
  // if (action.type === "PROMOTION") {
  //    if (state.item.amount === 3 && action.item.name.includes("Motion")) {
  //      const promoPrice = state.totalAmount - 10;
  //      let updatedItems;
  //      updatedItems = [...state.items];
  //       return {
  //         items: updatedItems,
  //         totalAmount: promoPrice
  //       };
  //     }
  //   if (action.item.amount === 2 && action.item.name.includes("Smoke")){
  //     const promoPrice = state.totalAmount - 5;
  //     let updatedItems;
  //     updatedItems = [...state.items];
  //     return {
  //       items: updatedItems,
  //       totalAmount: promoPrice
  //     }
  //   }
  // }
  //     } if (action.type === "PROMOTION") {
  //       const promoDiscount = state.totalAmount.reduce((item) => {
  //         if((item.amount === 2) && item.name.includes("Smoke")) {
  //           return promoDiscount === 35
  //         }
  //       })
  //     }
  //     return {totalAmount: promoDiscount}
  //   }, 0)  
  // }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandlerFunction = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  // const priceAfterDiscount = (item) => {
  //   dispatchCartAction({ type: "DISCOUNT", discount: item.discount });
  // };

  // const promoPrice = (item) => {
  //   dispatchCartAction({ type: "PROMOTION", promoprice: item.promoprice});
  // };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemHandlerFunction,
    clearCart: clearCartHandler,
    // discountTotal: priceAfterDiscount,
    // promoPrice: promoPrice,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
