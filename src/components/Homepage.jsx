import React, { useEffect } from "react";
import axios from "axios";

//formatting numnbers
import { millify } from "millify";

//and design
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//import our thunk to be called here
import { fetchExhange } from "../Redux/Exchange";

//ant design
import { LoadingOutlined } from "@ant-design/icons";

//components import
import { Crytocurrencies, News } from "../components";

const { Title } = Typography;

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExhange());
  }, [dispatch]);

  const exchange = useSelector((state) => state.exchange);

  if (exchange.status !== "success")
    return (
      <div className="loadingContainer">
        <LoadingOutlined style={{ fontSize: "5rem" }} />
      </div>
    );

  //intialize this here to be sure data as filled
  const globalState = exchange.exchange.data;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>

      {/* initializing a row */}
      <Row>
        {/* ant design is 24 */}
        <Col span={12}>
          {/* statistic bejave likes a flex colum title up, value below */}
          <Statistic
            title="Total Cryptocurrencies"
            value={globalState.stats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={`${millify(globalState.stats.totalExchanges)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={`${millify(globalState.stats.totalMarketCap)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`${millify(globalState.stats.total24hVolume)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={`${millify(globalState.stats.totalMarkets)}`}
          />
        </Col>
      </Row>

      {/* main coins container */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrecies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      {/* to render only 10 we will be needing a variable prop name it anyting */}
      <Crytocurrencies simplify />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">News</Link>
        </Title>
      </div>
      <News simplify />
    </>
  );
}

export default Homepage;
