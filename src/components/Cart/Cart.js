import React, { useContext, useState, useEffect } from "react";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";
import AvailableDiscounts from "../ShopItems/AvailableDiscounts";
import { Typography } from "@mui/material";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const cartCtx = useContext(CartContext);

  const totalAmount = () => {
    const totalDiscount = discounts.reduce((acc, d) => {
      if (d.checked && d.name.includes("%")) {
        return acc + d.amount;
      }
      return acc;
    }, 0);

    const totalFlatDiscount = discounts.reduce((acc, d) => {
      if (d.checked && d.name.includes("OFF")) {
        return acc + d.amount;
      }
      return acc;
    }, 0);

    let totalDiscountAmount = cartCtx.totalAmount;
    totalDiscountAmount =
      totalDiscountAmount - totalDiscountAmount * totalDiscount;
    totalDiscountAmount = totalDiscountAmount + totalFlatDiscount;

    return `${totalDiscountAmount.toFixed(2)}€`;
  };

  const hasItems = cartCtx.items.length > 0;

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await fetch(
        "https://webshop-33388-default-rtdb.europe-west1.firebasedatabase.app/discounts.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedDiscounts = [];

      for (const key in responseData) {
        loadedDiscounts.push({
          id: key,
          name: responseData[key].name,
          amount: responseData[key].amount,
          checked: false,
        });
      }
      setDiscounts(loadedDiscounts);
    };
    fetchDiscounts().catch((error) => {});
  }, []);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemDiscountHandler = (item, discount) => {
    cartCtx.discountTotal({ ...item, discount });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://webshop-33388-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, discount) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          discount={discount.amount}
          promoprice={item.promoprice}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <AvailableDiscounts
        onDiscount={cartItemDiscountHandler}
        discounts={discounts}
        setDiscounts={setDiscounts}
      />
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount()}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <Typography variant="h5" align="center" color="text.secondary">
      {" "}
      Sending order data...
    </Typography>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <Typography variant="h5" align="center" color="text.secondary">
        Your order is coming soon!
      </Typography>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
