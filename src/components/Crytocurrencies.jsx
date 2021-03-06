import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useSelector } from "react-redux";

function Crytocurrencies({ simplified }) {
  const [searchTerm, setsearchTerm] = useState("");

  //items fetched
  const cryptosList = useSelector(
    (state) => state?.exchange?.exchange?.data?.coins
  );

  const coinList = simplified ? cryptosList.slice(0, simplified) : cryptosList;

  //try to slice if simplified is passed in an ar arguments
  const [cryptos, setCryptos] = useState(coinList);

  useEffect(() => {
    const tempData = coinList.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(tempData);
  }, [searchTerm]);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="search Cryptocurrecy"
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                hoverable
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Crytocurrencies;
