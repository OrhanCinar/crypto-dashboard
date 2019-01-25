import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import CoinContainer from "./components/CoinContainer";
import ChartContainer from "./components/ChartContainer";
import BinanceSocket from "./actions";

import "./App.css";
import { getDailyTicker, getExchangeInfo } from "./components/RestApi";
import CandleStickCart from "./components/CandleStickCart";
import { TypeChooser } from "react-stockcharts/lib/helper";

class App extends Component {
  componentDidMount() {
    // console.log('App' , this.props);
    this.props.onWebSocketStart();
    getDailyTicker();
    getExchangeInfo();
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

            <CandleStickCart />
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
