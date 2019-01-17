import React, { Component } from "react";
//import CoinCard from "./components/Coincard";
import CoinContainer from "./components/CoinContainer";
import { binanceSocket } from "./actions";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

//import startWebSocket from "./components/binance-websocket";

import "./App.css";

class App extends Component {
  componentDidMount() {
    //this.setState(coins);
    //this.startWebSocket();
    this.props.onWebSocketStart();
  }

  startWebSocket() {
    this.ws = new WebSocket(
      //"wss://stream.binance.com:9443/ws/ethbtc@miniTicker" // single coin
      "wss://stream.binance.com:9443/ws/ethbtc@miniTicker/xlmbtc@miniTicker/tusdbtc@miniTicker/btcusdt@miniTicker"
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
      //const coins = [...state];
      //const coinIdx = coins.findIndex(c => c.id === coinName);

      //coins[coinIdx].price = price;
      //this.setState({ coins });
      console.log("update" + coinName);
      //dispatch(updateCoin(coins[0]));
      //this.forceUpdate();
      //}
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

            {/* <CoinCard coins={this.state.coins} />  */}
            <CoinContainer />

            <Container />
          </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    coinList : state.coinList
  };
};

const mapDispatchToProps = {
  onWebSocketStart: binanceSocket
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
