import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import CoinContainer from "./components/CoinContainer";
// eslint-disable-next-line
import ChartContainer from "./components/ChartContainer";
import BinanceSocket from "./actions";

import "./App.css";
import {
  // eslint-disable-next-line
  getDailyTicker,
  // eslint-disable-next-line
  getExchangeInfo,
  getKLine
} from "./components/RestApi";
// eslint-disable-next-line
import CandleStickCart from "./components/CandleStickCart";
// eslint-disable-next-line
import { TypeChooser } from "react-stockcharts/lib/helper";

class App extends Component {
  componentDidMount() {
    // console.log('App' , this.props);
    this.props.onWebSocketStart();
    //getDailyTicker();
    //getExchangeInfo();
    getKLine();
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
            {/* <TypeChooser>{type => <ChartContainer type={type} />}</TypeChooser> */}
          </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  //console.log('mapStateToProps',state);
  return {
    coinList: state.coinList,
    lineChartData: state.lineChartData,
    candleStickData: state.candleStickData
  };
};

const mapDispatchToProps = {
  onWebSocketStart: BinanceSocket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
