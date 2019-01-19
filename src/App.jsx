import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import CoinContainer from "./components/CoinContainer";
import ChartContainer from "./components/ChartContainer";
import BinanceSocket from "./actions";

import "./App.css";

class App extends Component {
  componentDidMount() {
    // console.log('App' , this.props);
    this.props.onWebSocketStart();
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
            <ChartContainer />
            <Container />
          </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('mapStateToProps',state);
  return {
    coinList: state.coinList,
    lineChartData: state.lineChartData
  };
};

const mapDispatchToProps = {
  onWebSocketStart: BinanceSocket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
