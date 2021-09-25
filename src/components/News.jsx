import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";

//formating timestamps
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../Redux/newsSlice";
import { LoadingOutlined } from "@ant-design/icons";

function News({ simplified }) {
  const coinList = useSelector((state) => state?.news);

  const { Text, Title } = Typography;
  const { Option } = Select;
  const [newCategory, setNewCategory] = useState("Ethereum");

  const demoImage =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews(newCategory));
  }, [dispatch, newCategory]);

  const exchange = useSelector((state) => state.exchange);

  if (exchange.status !== "success") return null;
  if (exchange.error) return null;

  if (coinList?.error) {
    return (
      <div className="loadingContainer">
        <Title level={3} className="heading">
          Oops, Data Fetching failed smh.
        </Title>
      </div>
    );
  }

  if (coinList?.status !== "success")
    return (
      <div className="loadingContainer">
        <LoadingOutlined style={{ fontSize: "5rem" }} />
      </div>
    );
  const listofExchangecoins = exchange.exchange.data.coins;

  const coins = simplified
    ? coinList.coin.value.slice(0, simplified)
    : coinList.coin.value;

  return (
    <Row gutter={[32, 32]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrecny</Option>
            {listofExchangecoins.map((coin, index) => {
              return (
                <Option key={index} value={coin.name}>
                  {coin.name}
                </Option>
              );
            })}
          </Select>
        </Col>
      )}
      {coins.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "100px",
                  }}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
