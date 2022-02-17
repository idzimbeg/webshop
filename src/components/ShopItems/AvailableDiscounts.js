import { useEffect, useState } from "react";

import Card from "../UI/Card";
import { Checkbox, FormControl, Box } from "@mui/material";

const AvailableDiscounts = (props) => {
  const [discounts, setDiscounts] = useState([]);
  const [checked, setChecked] = useState([true, false]);

  const handleChange = (event) => {
    setChecked([event.target.checked, event.target.checked]);
    // return props.onDiscount()
  };

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
        });
      }
      setDiscounts(loadedDiscounts);
    };
    fetchDiscounts().catch((error) => {});
  }, []);

  const discountList = discounts.map((discount) => (
    <FormControl >
      <p>{discount.name}</p>
      <Checkbox
        key={discount.id}
        id={discount.id}
        amount={discount.amount}
        // checked={checked[0] && checked[1]}
        // indeterminate={checked[0] !== checked[1]}
        onChange={handleChange}
      // onClick={props.onDiscount}
      />
    </FormControl>
  ));
  return (
    <section>
      <Card>
        <Box sx={{ display: "flex", flexFlow: "row" }}>
          <ul>{discountList}</ul>
        </Box>
      </Card>
    </section>
  );
};

export default AvailableDiscounts;
