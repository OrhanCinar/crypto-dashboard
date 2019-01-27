import React from "react";
// eslint-disable-next-line
import { format } from "d3-format";
// eslint-disable-next-line
import { timeFormat } from "d3-time-format";
import { utcDay } from "d3-time";
import { scaleTime } from "d3-scale";

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

  const width = 600;
  const ratio = 2;
  const type = "hybrid";
  const data = state.candleStickData;
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  // const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
  //   calculatedData
  // );
  console.log("Loading");
  const xAccessor = d => d.openTime;
  // eslint-disable-next-line
  const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 100])];

  //console.log("d", xAccessor);
  return (
    <ChartCanvas>
      ratio={ratio}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="BTCUSDT" data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}>
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
