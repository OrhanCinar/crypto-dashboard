import React, { Component } from "react";
import CoinCard from "./components/Coincard";

import { Container, Row, Col } from "reactstrap";

import startWebSocket from "./components/binance-websocket"

import "./App.css";

class App extends Component {
  constructor() {
    super();
  }

  state = {
    coins: [{ id: "ETHBTC", price: 0 }]
  };

  componentDidMount() {
    this.startWebSocket();
  }

  startWebSocket() {
    this.ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/ethbtc@miniTicker"
      //"wss://stream.binance.com:9443/ws/!miniTicker@arr"
    );

    this.ws.onopen = () => {
      console.log("opening");
    };

    this.ws.onclose = () => {
      console.log("closing");
    };

    this.ws.onerror = event => {
      console.log(`Error : ${event}`);
    };

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data);
      const coinName = data.s;

      //console.log("Coin" + coinName);

      const price = data.c;
      const coins = [...this.state.coins];

      const coin = coins.find(c => c.id === coinName);

      if (coin.price !== price) {
        coin.price = price;
        this.setState = { coins };
        this.forceUpdate();
      }
    };
  }

  render() {
    return (
      <div className="App">
        {
          <React.Fragment>
            <Container>
              <Row>
                <Col>TOP</Col>
              </Row>
            </Container>

            <CoinCard coins={this.state.coins} />

            <Container />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
