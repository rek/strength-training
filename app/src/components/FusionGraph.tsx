import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
// import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

export const SimpleTimeSeries: React.FC<{
  title: string;
  schema: { name: string; type: string; format?: string }[];
  data: any;
}> = ({ data, schema, title }) => {
  // Here we are creating our DataTable
  const fusionTable = new FusionCharts.DataStore().createDataTable(
    data,
    schema
  );

  const chartConfigs = {
    type: "timeseries",
    renderAt: "container",
    width: "1000",
    height: "600",
    dataSource: {
      caption: { text: title },
      // subCaption: { text: title },
      data: fusionTable,
      theme: "fusion",
      // yAxis: {
      //   format: {
      //     defaultFormat: 0,
      //   },
      //   //   binning: {
      //   //     millisecond: [10, 20, 50, 100, 200, 250, 500],
      //   //   },
      // },
      // chart: {
      //   formatNumberScale: "0",
      // },
      xAxis: {
        // binning: {
        //   year: [],
        //   month: [],
        //   day: [],
        //   hour: [],
        //   minute: [],
        //   second: [],
        //   millisecond: [1],
        // },
        // plot: [
        //   {
        //     value: "Value",
        //     connectNullData: true,
        //     type: "line",
        //   },
        // ],
        format: {
          defaultFormat: 0,
        },
        // outputTimeFormat: {
        //   //year: "",
        //   // month: "%b'%y (%q)",
        //   // day: "%d/%m (%a)",
        //   //hour: "",
        //   //minute: "",
        //   //second: "",
        //   millisecond: "%-L ms",
        // },
      },
      // yAxis: [
      //   {
      //     plot: [
      //       {
      //         value: "----?----",
      //       },
      //     ],
      //   },
      // ],
    },
  };

  return <ReactFC {...chartConfigs} />;
};
