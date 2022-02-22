import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    address: true,
    card: true,
    discount: true,
  });
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const cardInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCard = cardInputRef.current.value;

    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCardIsValid = !isEmpty(enteredCard);

    setFormInputValidity({
      email: enteredCardIsValid,
      address: enteredAddressIsValid,
      card: enteredCardIsValid,
    });

    const formIsValid =
      enteredEmailIsValid && enteredAddressIsValid && enteredCardIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      email: enteredEmail,
      address: enteredAddress,
      card: enteredCard,
    });
  };

  const emailControlClasses = `${classes.control} ${
    formInputValidity.email ? "" : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputValidity.address ? "" : classes.invalid
  }`;
  const cardControlClasses = `${classes.control} ${
    formInputValidity.card ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={emailControlClasses}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" ref={emailInputRef} />
        {!formInputValidity.email && <p>Please enter a valid Email</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <p>Please enter a valid address</p>}
      </div>
      <div className={cardControlClasses}>
        <label htmlFor="card">Card number</label>
        <input type="text" id="card" ref={cardInputRef} />
        {!formInputValidity.card && <p>Please enter a valid card number</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
