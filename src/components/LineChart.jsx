import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  //push price and timestamp to create line chart
  for (let i = 0; i < coinHistory?.coinHistory?.data?.history.length; i++) {
    coinPrice.push(coinHistory?.coinHistory?.data?.history[i]?.price);
    coinTimeStamp.push(
      new Date(
        coinHistory?.coinHistory?.data?.history[i]?.timestamp
      ).toLocaleDateString()
    );
  }

  //data to be used in LIne chart
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const option = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      (
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price : $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} option={option} />)
    </>
  );
};

export default LineChart;
