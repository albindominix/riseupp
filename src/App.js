import { useEffect, useState } from "react";
import "./App.css";
import SearchField from "./components/SearchField";
import ReactPaginate from "react-paginate";
import spinner from "./assets/Eclipse-1s-200px (2).svg";

function App() {
  const [res, setRes] = useState([]);
  const [img, setImg] = useState("");
  const [totalPages, setTotalPages] = useState(0);
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
      setTotalPages(dataJ.total_pages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  function handlePageClick(data) {
    let currentPage = data.selected + 1;
    fetchRequest(currentPage);
  }

  return (
    <div className="App">
      <SearchField setImg={setImg} submit={fetchRequest} />
      {loading ? (
        <div className="loader">
          <img src={spinner} alt="loader svg" />
        </div>
      ) : (
        <div>
          <div className="result">See results for {img}</div>
          <div className="images">
            {res.map((images) => (
              <div className="image-div">
                <img
                  className="image"
                  id={images.id}
                  src={images.urls.small}
                  alt={images.alt_description}
                />
                <div className="detail">
                  <h3>{images.alt_description}</h3>
                  <div className="hashtags">
                    {images.tags.map((tag) => (
                      <h5># {tag.title}</h5>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ReactPaginate
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        containerClassName="paginate-wrapper"
        pageClassName="pagination-button"
        activeClassName="pagination-button-active"
        previousClassName="skip-button-active"
        nextClassName="skip-button-active"
        disabledClassName="skip-button-disable"
        breakClassName="breakLabel"
      />
    </div>
  );
}

export default App;
