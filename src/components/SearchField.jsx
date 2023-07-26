
import React, { useEffect, useState } from 'react'
import './SearchField.css'
export default function SearchField({setImg}) {
    const [value, setValue] = useState("horse");
    useEffect(() => {
        setImg(value);
      }, []);
    
    function handleSubmit(e) {
      e.preventDefault();
      setImg(value);
    }
      
    return (
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="search">
              <div>
                <input
                  id="search"
                  placeholder="Search..."
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <button type="submit">
                <img className="search-icon" src={searchIcon} />
              </button>
            </div>
          </form>
        </div>
      );
}
