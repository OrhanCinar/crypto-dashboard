import React from "react";
// eslint-disable-next-line
import { format } from "d3-format";
// eslint-disable-next-line
import { timeFormat } from "d3-time-format";
import { utcDay } from "d3-time";
import { scaleTime } from "d3-scale";
//import * as d3 from "d3";
import { connect } from "react-redux";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { ChartCanvas, Chart } from "react-stockcharts";

import {
  // eslint-disable-next-line
  BarSeries,
  // eslint-disable-next-line
  AreaSeries,
  // eslint-disable-next-line
  CandlestickSeries,
  // eslint-disable-next-line
  LineSeries,
  // eslint-disable-next-line
  MACDSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  // eslint-disable-next-line
  CrossHairCursor,
  // eslint-disable-next-line
  EdgeIndicator,
  // eslint-disable-next-line
  CurrentCoordinate,
  // eslint-disable-next-line
  MouseCoordinateX,
  // eslint-disable-next-line
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
// eslint-disable-next-line
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import {
  // eslint-disable-next-line
  OHLCTooltip,
  // eslint-disable-next-line
  MovingAverageTooltip,
  // eslint-disable-next-line
  MACDTooltip
} from "react-stockcharts/lib/tooltip";

const CandleStickCart = state => {
  //const { type, width, ratio } = this.props;

  const calculatedData = state.candleStickData || [];
  if (calculatedData.length === 0) {
    return <div>Loading...</div>;
  }
  // const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
  //   calculatedData
  // );

  const xAccessor = d => d.openTime;
  // eslint-disable-next-line
  // const xExtents = [
  //   xAccessor(last(calculatedData)),
  //   xAccessor(calculatedData[calculatedData.length - 100])
  // ];
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    d => d.openTime
  );

  const { data, xScale, displayXAccessor } = xScaleProvider(calculatedData);

  // var xScale = d3.scaleTime()
  // .domain([minDate, maxDate])
  // .range([0,w]);//an array here

  console.log("Loading", xScale);

  const width = 600;
  const ratio = 1;
  const type = "hybrid";

  return (
    <ChartCanvas>
      height={400}
      ratio={ratio}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="BTCUSDT" data={data}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xScale={xScale}
      <Chart id={1} yExtents={d => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
      </Chart>
    </ChartCanvas>
  );
};

//export default CandleStickCart;

const mapStateToProps = (state, props) => {
  //console.log("CandleStickCart", state.coinReducer.candleStickData);
  return {
    candleStickData: state.coinReducer.candleStickData
  };
};

export default connect(
  mapStateToProps,
  null
)(CandleStickCart);
