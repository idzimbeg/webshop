import { useEffect, useState } from "react";

import Item from "./Item/Item";
import CardDisplay from "../UI/CardDisplay";

const AvailableItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://webshop-33388-default-rtdb.europe-west1.firebasedatabase.app/items.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedItems = [];

      for (const key in responseData) {
        loadedItems.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          discount: responseData[key].discount,
          promoprice: responseData[key].promoprice,
        });
      }
      setItems(loadedItems);
      setIsLoading(false);
      setError(false);
    };
    fetchItems().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }
  const itemsList = items.map((item) => (
    <Item
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      discount={item.discount.amount}
      promoprice={item.promoprice}
    />
  ));
  return (
    <section>
      <CardDisplay>
        <ul>{itemsList}</ul>
      </CardDisplay>
    </section>
  );
};

export default AvailableItems;
