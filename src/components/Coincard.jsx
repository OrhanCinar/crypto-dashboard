import React from "react";
import { ListGroupItem } from "reactstrap";

function CoinCard({ coin }) {
  return (
    <ListGroupItem
      key={coin.id}
      color={coin.priceChange === "up" ? "success" : "danger"}
      className="left"
    >
      {coin.id}/{coin.price}
    </ListGroupItem>
  );
}

export default CoinCard;
