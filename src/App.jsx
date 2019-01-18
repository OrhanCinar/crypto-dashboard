import React, { Component } from "react";
import CoinContainer from "./components/CoinContainer";
import  BinanceSocket  from "./actions";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

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

            <Container />
          </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    coinList: state.coinList
  };
};

const mapDispatchToProps = {
  onWebSocketStart: BinanceSocket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
