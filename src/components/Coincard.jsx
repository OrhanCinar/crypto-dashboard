import React from "react";
import { ListGroupItem } from "reactstrap";

function CoinCard({ coin }) {
  return (
    <ListGroupItem key={coin.id}>
      {coin.id}
      <p>{coin.price}</p>
    </ListGroupItem>
  );
}

export default CoinCard;
