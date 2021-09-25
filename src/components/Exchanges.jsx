import React, { useEffect } from "react";
import { fetchExchange } from "../Redux/coinExchange";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Panel } = Collapse;

function Exchanges() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchange());
  }, [dispatch]);

  let exchange = useSelector((state) => state.coinExchange);

  if (exchange?.error) {
    return (
      <div className="loadingContainer">
        <Title level={3} className="heading">
          Oops, Data Fetching failed smh.
        </Title>
      </div>
    );
  }

  if (exchange?.status !== "success")
    return (
      <div className="loadingContainer">
        <LoadingOutlined style={{ fontSize: "5rem" }} />
      </div>
    );

  exchange = exchange.coinExchange.data.exchanges;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchange.map((exchange, index) => (
          <Col key={index} span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Exchanges;
