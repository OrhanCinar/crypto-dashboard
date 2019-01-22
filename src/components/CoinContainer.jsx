import React from "react";
import { connect } from "react-redux";
import CoinCard from "./Coincard";
import { Container, Row, ListGroup } from "reactstrap";

const CoinList = state => {
  //console.log(state);
  return (
    <Container>
      {
        <Row>
          <h2>Count : {state.coinList.length}</h2>
        </Row>
      }

      {
        <Row>
          <ListGroup>
            {state.coinList.map(coin => {
              return <CoinCard coin={coin} key={coin.id} />;
            })}
          </ListGroup>
        </Row>
      }
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  //console.log(state);
  return {
    coinList: state.coinReducer.coinList
  };
};

export default connect(
  mapStateToProps,
  null
)(CoinList);
