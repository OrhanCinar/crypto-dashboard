import React from "react";
import { ListGroupItem } from "reactstrap";

function CoinCard({ coin }) {
  //console.log("props " + coin);
  //const { coins } = this.props;

  return (
    <ListGroupItem key={coin.id}>
      {coin.id}
      <h5>{coin.price}</h5>
    </ListGroupItem>
  );
}

export default CoinCard;
