import React from "react";
import {Chart, Line} from "react-chartjs-2";
import { Container, Row, Col, ListGroup } from "reactstrap";
import { connect } from "react-redux";

const ChartContainer = state => {
  return (
    <Container>
      <Line
        data = {state.lineChartData}
        options = {state.lineChartOptions}
      />
    </Container>
  );
};

const mapStateToProps = (state, props) => {
    //console.log(state);
    return {
        lineChartData: state.coinReducer.lineChartData
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(ChartContainer);
  
