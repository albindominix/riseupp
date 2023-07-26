import { useEffect, useState } from "react";
import "./App.css";
import SearchField from "./components/SearchField";
import ReactPaginate from "react-paginate";
import spinner from "./assets/Eclipse-1s-200px (2).svg";

function App() {
  const [res, setRes] = useState([]);
  const [img, setImg] = useState("");
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchRequest();
  }, [img]);


  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;


  const fetchRequest = async (currentPage = 1) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=${img}&client_id=${ACCESS_KEY}&per_page=10`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      setRes(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  

  return (<>
  </>);
}

export default App;
