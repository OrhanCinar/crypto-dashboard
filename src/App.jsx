import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import CoinContainer from "./components/CoinContainer";

import BinanceSocket from "./actions";

import "./App.css";
import GetKLine, {
  getDailyTicker,
  getExchangeInfo
} from "./components/RestApi";

import MyCandleStickChart from "./components/MyCandleStickChart";

class App extends Component {
  componentDidMount() {
    // console.log('App' , this.props);
    this.props.onWebSocketStart();
    //getDailyTicker();
    //getExchangeInfo();
    this.props.onKLineAPI();
  }

  render() {
    return (
      <div className="App">
        {
          <React.Fragment>
            <Container>
              <Row>
                <Col>
                  <CoinContainer />
                </Col>
              </Row>
            </Container>
            {/* <CoinCard coins={this.state.coins} />  */}

            {/* {this.props.candleStickData &&
              this.props.candleStickData.length > 0 && <CandleStickCart />} */}
            {/* <CandleStickCart /> */}
            <MyCandleStickChart />
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
  onWebSocketStart: BinanceSocket,
  onKLineAPI: GetKLine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
