import { Fragment } from "react";

import ItemsSummary from "./ItemsSummary";
import AvailableItems from "./AvailableItems";

const ShopItems = () => {
  return (
    <Fragment>
      <ItemsSummary />
      <AvailableItems />
    </Fragment>
  );
};

export default ShopItems;
