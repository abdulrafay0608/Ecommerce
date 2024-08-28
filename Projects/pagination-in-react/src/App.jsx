import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import CryptoList from "./components/CryptoList";
import Pagination from "./components/Pagination";
// import { Pagination } from "antd";

function App() {
  const [coinsData, setCoinsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    setCoinsData(response.data);
  };
  //           9              1            9
  const lastPostIndex = currentPage * postsPerPage;
  //          0                9               9
  const firstPostIndex = lastPostIndex - postsPerPage;
  //      9 object                              0               9
  const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="app">
      <h1>Crypto Gallery</h1>
      <CryptoList coinsData={currentPosts} />
      <Pagination
        totalPosts={coinsData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {/* <div className="bg-white my-8 flex justify-center items-center text-white">
        <Pagination className="text-white" defaultCurrent={9} total={coinsData.length} />;
      </div> */}
    </div>
  );
}

export default App;
