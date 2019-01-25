import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { utcDay } from "d3-time";
import { scaleTime } from "d3-scale";

import { connect } from "react-redux";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  AreaSeries,
  CandlestickSeries,
  LineSeries,
  MACDSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import {
  OHLCTooltip,
  MovingAverageTooltip,
  MACDTooltip
} from "react-stockcharts/lib/tooltip";

const CandleStickCart = state => {
  //const { type, data: initialData, width, ratio } = this.props;

  const width = 600;
  const ratio = 2;
  const type = "hybrid";
  const data = state.candleStickData;

  // const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
  //   calculatedData
  // );

  const xAccessor = d => d.date;
  const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 100])];

  console.log("d", xAccessor);
  return (
    <ChartCanvas>
      ratio={ratio}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="MSFT" data={data}
      {/* xAccessor={xAccessor} */}
      xScale={scaleTime()}
      {/* xExtents={xExtents}> */}
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
  //console.log(state);
  return {
    candleStickData: state.coinReducer.candleStickData
  };
};

export default connect(
  mapStateToProps,
  null
)(CandleStickCart);
