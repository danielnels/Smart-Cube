import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./MoistureData.css";
class MoistureData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [
            [1619848800000, 10],
            [1619913600000, 15],
            [1620000000000, 10],
            [1620086400000, 15],
            [1620172800000, 10],
            [1620259200000, 15],
          ],
        },
      ],
      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 150,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 5,
              borderColor: "whitesmoke",
              label: {
                show: true,
                text: "Date",
                style: {
                  color: "white",
                  background: "transparent",
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date("02 May 2021").getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Soil Moisture",
                style: {
                  color: "white",
                  background: "transparent",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date("02 May 2021").getTime(),
          tickAmount: 6,
        },
        tooltip: {
          enabled: true,
          followCursor: false,
          theme: "dark",
          x: {
            format: "dd MMM yyyy",
            style: {
              color: "black",
            },
          },
          style: {
            color: "white",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 1,
            colors: ["blue", "purple"],
            stops: [0, 100],
          },
        },
      },

      selection: "one_year",
    };
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="area"
        width={1100}
        height={750}
      />
    );
  }
}

export default MoistureData;
