import React from "react"
import ReactApexChart from "react-apexcharts"

const AccessByGender = () => {
  const series = [44, 55]
  const options = {
    labels: ["Эрэгтэй", "Эмэгтэй"],
    colors: ["#34c38f", "#556ee6"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }

  return (
    <ReactApexChart options={options} series={series} type="pie" height="380" />
  )
}

export default AccessByGender
