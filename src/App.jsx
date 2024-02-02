import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from "./components/Layout"
import Home from "./components/Home"
import Coins from "./components/Coins"
import Exchanges from "./components/Exchanges"
import CoinDetails from "./components/CoinDetails"

function App() {





const router = createBrowserRouter([{
  path : "/",
  element : <Layout/>,
  children : [
    {
      path : "/",
      element : <Home/>,
    },
    {
      path : "/coins",
      element : <Coins/>,
    },
    {
      path : "/exchanges",
      element : <Exchanges/>,
    },
    {
      path : "/coin/:id",
      element : <CoinDetails/>,
    },
    
  ]
}])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
