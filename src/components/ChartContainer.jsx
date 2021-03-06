import React from "react";
import { Line } from "react-chartjs-2";
import { Container } from "reactstrap";
import { connect } from "react-redux";

const chartcontainer = {
  height: 400
};
const ChartContainer = state => {
  return (
    <div className={chartcontainer}>
      <Container>
        <Line data={state.lineChartData} options={state.lineChartOptions} />
      </Container>
    </div>
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

//https://github.com/rrag/react-stockcharts
