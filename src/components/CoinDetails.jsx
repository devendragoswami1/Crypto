/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../main";
import { useParams } from "react-router-dom";
import Error from "./Error";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import Chart from "./Chart";

function CoinDetails() {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params = useParams();
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];
  const statsHandler = (key) => {
    {
      console.log(key);
    }
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);

        break;
      case "14d":
        setDays("14d");
        setLoading(true);

        break;
      case "30d":
        setDays("30d");
        setLoading(true);

        break;
      case "60d":
        setDays("60d");
        setLoading(true);

        break;
      case "200d":
        setDays("200d");
        setLoading(true);

        break;
      case "365d":
        setDays("365d");
        setLoading(true);

        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);
  if (error) return <Error message={"Error while fetching coin..."} />;

  return (
    <div className=" bg-green-400/50 flex flex-col items-center justify-center p-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="border w-full lg:h-[75vh] h-[50vh] flex items-center justify-center max-w-screen ">
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>
          <div className="px-3 py-1 flex gap-4 text-white">
            {btns.map((i) => (
              <button
                className="px-3 py-2 bg-black"
                key={i}
                onClick={() => statsHandler(i)}>
                {i}
              </button>
            ))}
          </div>

          <select
            className=" w-32 border-none outline-none hover:border-b shadow-xl p-4 self-start"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            {currency}
            <option value="inr">inr</option>
            <option value="usd">usd</option>
            <option value="eur">eur</option>
          </select>

          <div className="flex flex-col gap-3 w-full max-w-3xl">
            <p className="text-gray-500/70 text-center">
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}{" "}
            </p>
            <img
              className="w-32 h-32 object-contain"
              src={coin.image.large}
              alt=""
            />
            <div className="">
              <p>{coin.name} </p>
              <p>
                {currencySymbol} {coin.market_data.current_price[currency]}{" "}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <FaArrowAltCircleUp className="text-green-500" />
              ) : (
                <FaArrowAltCircleDown className="text-red-500" />
              )}
              <span>
                {coin.market_data.price_change_percentage_24h}% Last 24 hour
              </span>
            </div>
            <div className="text-2xl bg-green-400 px-4 py-2 w-16 text-white font-bold">{`#${coin.market_cap_rank}`}</div>
            <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
          </div>

          <div className="w-full max-w-3xl">
            <Item title={"max supply"} value={coin.market_data.max_supply} />
            <Item
              title={"circulating supply"}
              value={coin.market_data.circulating_supply}
            />
            <Item
              title={"market capital"}
              value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
            />
            <Item
              title={"all time low"}
              value={`${currencySymbol}${coin.market_data.atl[currency]}`}
            />
            <Item
              title={"all time high"}
              value={`${currencySymbol}${coin.market_data.ath[currency]}`}
            />
          </div>
        </>
      )}
    </div>
  );
}

const CustomBar = ({ high, low }) => (
  <div className="w-full flex flex-col justify-between gap-4">
    <p className="bg-gray-300">
      <span className="  bg-green-400 pl-[50%]  "></span>
    </p>
    <div className="flex justify-between">
      <div className="bg-red-500 p-2 rounded-md">{low}</div>
      <p> Last 24H Range</p>
      <div className="bg-green-500 p-2 rounded-md">{high}</div>
    </div>
  </div>
);

const Item = ({ title, value }) => (
  <div className="flex p-3 justify-between  tracking-widest">
    <p> {title} </p>
    <p> {value} </p>
  </div>
);

export default CoinDetails;
