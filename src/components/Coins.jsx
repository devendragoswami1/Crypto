/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";
function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPages(page);
    setLoading(true);
  };

  const countBtn = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${pages}`
        );
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchCoins();
  }, [currency, pages]);

  if (error) return <Error message={"Error while fetching coins..."} />;

  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* <div className="mx-10 my-4">
              <div className="flex gap-4" onChange={ (e) => setCurrency(e.target.value)}>
              <label htmlFor="inr">
                  <input id="inr" name="currency"  type="radio" value={"inr"}  />
                  ₹ INR
              </label>
              <label htmlFor="usd">

                  <input id="usd" name="currency" type="radio" value={"usd"} />
                   $ USD
              </label>

                   <label htmlFor="eur">

                  <input id="eur" name="currency" type="radio" value={"eur"} />
                  € EUR
              </label>
              </div>
            </div> */}
             <select className='mx-10 my-6 w-32 border-none outline-none hover:border-b shadow-sm' value={currency} onChange={ (e) => setCurrency(e.target.value)}>{currency}
            <option value="inr">inr</option>
            <option value="usd">usd</option>
            <option value="eur">eur</option>
            </select>

            <div className="flex flex-wrap items-center justify-center gap-8 py-6 px-3 md:p-6">
              {coins.map((i) => (
                <CoinCard
                  id={i.id}
                  name={i.name}
                  image={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  currencySymbol={currencySymbol}
                />
              ))}
            </div>
            <div className="w-full flex overflow-x-auto p-4 text-white gap-4">
              {countBtn.map((item, index) => (
                <button
                key={index}
                  className="px-4 py-2 hover:scale-110 bg-black"
                  onClick={() => changePage(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const CoinCard = ({ id, name, image, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
    <div className="shadow-xl flex flex-col items-center justify-center rounded-lg hover:scale-105 p-3 relative h-40 w-40 ">
      <img
        className="h-8 w-8 object-cover rounded-full "
        src={image}
        alt={name}
      />
      <h2 className="text-xl" title="trust score">
        {symbol}
      </h2>
      <p className="line-clamp-1" title="currency name">
        {name}
      </p>
      <p className="line-clamp-1" title="currency name">
        {price ? `${currencySymbol}${price}` : "NA"}
      </p>
    </div>
  </Link>
);

const Pagination = () => (
  hii
)

export default Coins;
