import React from "react";
import { connect } from "react-redux";

import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { ChartCanvas, Chart } from "react-stockcharts";
import { utcHour } from "d3-time";
import { scaleTime } from "d3-scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate
} from "react-stockcharts/lib/coordinates";

import {
  BarSeries,
  AreaSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";

import {
  OHLCTooltip,
  MovingAverageTooltip
} from "react-stockcharts/lib/tooltip";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

class CandleStickChart extends React.Component {
  componentDidMount() {}

  // myLoop = data => {
  //   let myString = "";

  //   // for (let i = 0; i < 5; i++) {
  //   //   const { open } = data[i];
  //   //   // console.log(open);
  //   //   myString += open + " ";
  //   // }

  //   //console.log("myString", myString);
  //   return myString;
  // };

  render() {
    //console.log("props", this.props);

    if (
      this.props.candleStickData === null ||
      this.props.candleStickData.length === 0
    ) {
      return <div>Loading...</div>;
    }

    const calculatedData = this.props.candleStickData;

    const xAccessor = d => d.openTime;
    const xExtents = [
      xAccessor(last(calculatedData)),
      xAccessor(calculatedData[Math.max(0, calculatedData.length - 500)])
    ];

    const width = 1600;
    const ratio = 1;
    const type = "hybrid";

    console.log("xExtents", xExtents);

    const ema20 = ema()
      .options({
        windowSize: 20, // optional will default to 10
        sourcePath: "close" // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.ema20 = c;
      }) // Required, if not provided, log a error
      .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional

    return (
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
        type={type}
        seriesName="BTC"
        data={calculatedData}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={d => [d.high, d.low]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcHour)} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
          <CurrentCoordinate
            yAccessor={ema20.accessor()}
            fill={ema20.stroke()}
          />
          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: ema20.accessor(),
                type: "EMA20",
                stroke: ema20.stroke(),
                windowSize: ema20.options().windowSize,
                echo: ""
              }
            ]}
          />
        </Chart>

        <Chart
          id={2}
          height={150}
          yExtents={d => d.volume}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".0s")}
          />
          >
          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

const mapStateToProps = state => {
  return {
    candleStickData: state.coinReducer.candleStickData
  };
};

export default connect(mapStateToProps)(CandleStickChart);
