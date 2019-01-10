import React, { Component } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

class CoinCard extends Component {
  render() {
    const { coins } = this.props;

    const coinMap = coins.map(coin => (
      <ListGroupItem key={coin.id}>
        {coin.id}
        <h5>{coin.price}</h5>
      </ListGroupItem>
    ));

    return (
      <Container>
        {
          <Row>
            <ListGroup>{coinMap}</ListGroup>
          </Row>
        }
      </Container>
    );
  }
}

export default CoinCard;
