/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import Loader from "./Loader";
import Error from "./Error";
function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [pages, setPages] = useState(1);
  const countBtn = new Array(132).fill(1);
  const changePage = (page) => {
    setPages(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchExchanges = async () => {

      try{
        const { data } = await axios.get(`${server}/exchanges?&page=${pages}`);
        setExchanges(data);
        setLoading(false);
      } catch(error){
        setError(true)
        setLoading(false)
      }

    };
    fetchExchanges();
  }, [pages]);

if(error) return <Error message={"Error while fetching exchanges..."}/>

  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-8 py-6 px-3 md:p-6">
              {exchanges.map((i) => (
                <ExchangesCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  url={i.url}
                  country={i.country}
                  trust_score={i.trust_score}
                  trust_score_rank={i.trust_score_rank}
                  year_established={i.year_established}
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

const ExchangesCard = ({
  name,
  image,
  url,
  country,
  trust_score,
  trust_score_rank,
  year_established,
}) => (
  <a href={url} target={"blank"}>
    <div className="shadow-lg flex flex-col items-center justify-center rounded-lg hover:scale-105 p-3 relative h-40 w-40 ">
    <p className="absolute left-2 top-2" title="trust score rank">{trust_score_rank}</p>
      <img className="h-8 w-8 object-cover rounded-full " src={image} alt={name} />
      <h2 className="text-xl" title="trust score">{trust_score}</h2>
      <p className="line-clamp-1" title="currency name">{name}</p>
      <h3 className="line-clamp-1 text-sm" title="country name">{country}</h3>
      <p className="text-sm">since {year_established}</p>
    </div>
  </a>
);

export default Exchanges;
