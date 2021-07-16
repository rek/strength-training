import React from "react";
import daysjs from "dayjs";
import { View, Dimensions } from "react-native";
import { LineChart as LineChartRaw } from "react-native-chart-kit";

export type ChartDataItem = {
  y: number;
  x: number;
};
export type ChartData = ChartDataItem[];

interface Props {
  data: ChartData;
  xFormat?: string;
  disableXAxis?: boolean;
  dotSize?: number;
  yAxisSuffix?: string;
  yAxisLabel?: string;
}
export const LineChart: React.FC<Props> = ({
  data,
  disableXAxis,
  dotSize = 6,
  xFormat = "DD/MM",
  yAxisSuffix = "",
  yAxisLabel = "",
}) => {
  // console.log("data", data);

  if (!data || data.length === 0) {
    return null;
  }

  const height = 250;
  // const screenWidth = 1000;
  const totalScreenWidth = Dimensions.get("window").width;
  const screenWidth = totalScreenWidth * 0.9;

  const labelInterval = Number((data.length / 10).toFixed(0));
  // console.log("labelInterval", labelInterval);

  let initialData: ChartData = [];
  const labels = data
    .reduce((result, item, index) => {
      if (index % labelInterval === 0) {
        return result;
      }

      return [...result, item];
    }, initialData)
    .map((item) => daysjs(item.x).format(xFormat))
    .filter(() => (disableXAxis === undefined ? true : false));

  return (
    <View
      style={{
        flexDirection: "row",
        height: height,
        width: screenWidth,
      }}
    >
      <LineChartRaw
        data={{
          labels,
          datasets: [
            {
              data: data.map((item) => item.y),
            },
          ],
        }}
        width={screenWidth}
        height={height}
        // fromZero={true}
        // verticalLabelRotation={0}
        // horizontalLabelRotation={0}
        xLabelsOffset={-10}
        // yLabelsOffset={0}
        segments={5}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#333",
          backgroundGradientFrom: "#333",
          backgroundGradientTo: "#333",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: dotSize,
            strokeWidth: "1",
            stroke: "#ffa726",
          },
        }}
        bezier={false}
        style={
          {
            // marginVertical: 8,
            // borderRadius: 16,
          }
        }
      />
    </View>
  );
};
