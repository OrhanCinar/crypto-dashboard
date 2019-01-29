import React from "react";
import { connect } from "react-redux";

import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { ChartCanvas, Chart } from "react-stockcharts";
import { utcDay, utcHour } from "d3-time";
import { scaleTime } from "d3-scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries } from "react-stockcharts/lib/series";
class Test extends React.Component {
  componentDidMount() {
    //console.log("props", this.props);
  }

  myLoop = data => {
    let myString = "";

    // for (let i = 0; i < 5; i++) {
    //   const { open } = data[i];
    //   // console.log(open);
    //   myString += open + " ";
    // }

    //console.log("myString", myString);
    return myString;
  };

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
      xAccessor(calculatedData[calculatedData.length - 500])
    ];

    const width = 1800;
    const ratio = 1;
    const type = "hybrid";

    console.log("xExtents", xExtents);
    return (
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={calculatedData}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={1} />
          <YAxis axisAt="left" orient="left" ticks={1} />
          <CandlestickSeries width={timeIntervalBarWidth(utcHour)} />
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

export default connect(mapStateToProps)(Test);
