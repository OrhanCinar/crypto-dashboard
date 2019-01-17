import React from "react";
import { connect } from "react-redux";
import CoinCard from "./Coincard";
import { Container, Row, Col, ListGroup } from "reactstrap";

const CoinList = state => {
  //console.log("CoinList" + state.coinList.coinList[0].price);
  return (
    <Container>
      {
        <Row>
          <ListGroup>
            {state.coinList.coinList.map(coin => {
              return <CoinCard coin={coin} key={coin.id} />;
            })}
          </ListGroup>
        </Row>
      }
    </Container>
  );
};

// const mapStateToProps = state => {
//   console.log("mapStateToProps" + state.coins);
//   return {
//     coins: state.coins
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateCoin: id => dispatch({ type: "UPDATE_COIN", id })
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CoinList);

const mapStateToProps = (state, props) => {
  return {
    coinList: state.coinList
  };
};
export default connect(
  mapStateToProps,
  null
)(CoinList);
