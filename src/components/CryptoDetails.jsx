import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { fetchCoinDetails } from "../Redux/coinDetailsSlice";
import LineChart from "./LineChart";
import { fetchCoinHistory } from "../Redux/coinHistory";

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const { coinId } = useParams();
  const dispatch = useDispatch();
  const [timePeriod, settimePeriod] = useState("7d");

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
    dispatch(fetchCoinHistory({ coinId, timePeriod }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCoinHistory({ coinId, timePeriod }));
  }, [timePeriod]);

  //coinHistory from store
  let coinHistory = useSelector((state) => state.coinHistory);

  let cryptoDetails = useSelector((state) => state.coinDetails);
  //time period

  if (cryptoDetails.error) {
    return (
      <div className="loadingContainer">
        <Title level={3} className="heading">
          Oops, Data Fetching failed smh.
        </Title>
      </div>
    );
  }

  if (cryptoDetails.status === "loading" || cryptoDetails.status === "idle") {
    return (
      <div className="loadingContainer">
        <LoadingOutlined style={{ fontSize: "5rem" }} />
      </div>
    );
  }

  //accessing the cryDetails if all conditions above as been met
  cryptoDetails = cryptoDetails.coinDetails.data.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="class-details-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails.name} Live price in US dollars. View value Statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7day"
        className="select-timeperiod"
        placeholder="select time period"
        onChange={(value) => settimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {/*  line chart */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-dash-value-statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              {cryptoDetails.name} Value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="coin-value-statistics">
          <Col className="coin-dash-value-statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              {cryptoDetails.name} Value statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetails;
