import { useState, useContext } from "react";

import CardDisplay from "../UI/CardDisplay";
import CartContext from "../../store/cart-context";

import { Checkbox, FormControl, Box } from "@mui/material";

const AvailableDiscounts = ({ discounts, setDiscounts }) => {
  const cartCtx = useContext(CartContext);
  const [checked, setChecked] = useState([true, false]);

  const checkedCount = Object.keys(checked).filter(
    (key) => checked[key]
  ).length;
  const disabled = checkedCount > 1;
  const hasItems = cartCtx.items.length > 0;

  const handleChange = (event, discountName) => {
    const newDiscounts = discounts.map((discount) => {
      if (discount.name === discountName) {
        return {
          ...discount,
          checked: event.target.checked,
        };
      }
      return discount;
    });
    setDiscounts(newDiscounts);
    setChecked([event.target.checked, event.target.checked]);
  };

  const discountList = discounts.map((discount) => (
    <FormControl>
      <p>{discount.name}</p>
      <Checkbox
        key={discount.id}
        id={discount.id}
        amount={discount.amount}
        checked={discount.checked}
        disabled={(discount.checked && !discount.name.includes("%")) || disabled}
        onChange={(ev) => handleChange(ev, discount.name)}
      />
    </FormControl>
  ));
  return (
    <section>
      {hasItems && (
        <CardDisplay>
          <Box sx={{ display: "flex", flexFlow: "row" }}>
            <ul>{discountList}</ul>
          </Box>
        </CardDisplay>
      )}
    </section>
  );
};

export default AvailableDiscounts;
