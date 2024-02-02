/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

function Chart({arr=[], currency, days}) {

    const prices=[]
    const date =[]

    for(let i=0; i < arr.length; i++){
      days === "24h"?
      date.push(new Date( arr[i][0]).toLocaleTimeString()):
      date.push(new Date( arr[i][0]).toLocaleDateString())
      prices.push(arr[i][1])
    }
    console.log(prices);

    const data = {
      labels : date,
      datasets : [{
          label : `price in ${currency}`,
          data : prices ,borderColor : "yellow",backgroundColor : "green",
      }]
  }
  return <>
    <Line options={{
        responsive : true,
    }}
    data = {data}
    />
  </>;
}

export default Chart;
