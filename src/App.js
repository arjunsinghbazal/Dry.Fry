import React, { useState, useEffect } from "react";
import logo from "./image/clipart1129793.png";
import "./App.css";
import Cart from "./Cart";

const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const nonVegCategories = ['Chicken', 'Seafood', 'Vegan', 'Goat','Lamb','Pork'];
  const VegCategories = ["Pasta","Starter","Dessert","Vegetarian"];
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const categories = responseData.categories;
      setData(categories);
      setFilter(categories);
      console.log(data)
      console.log(filter)
    } catch (error) {
      setError("Unable to fectch the data");
    } finally {
      setLoading(false);
    }
  };

  const handleVegClick=()=>{
    const filterVegData=data.filter(items=>VegCategories.includes(items.strCategory))
    setFilter(filterVegData)
  }

  const handleNonVegClick = () => {
    const filteredNonVegData = data.filter(category =>
      nonVegCategories.includes(category.strCategory)
    );
    setFilter(filteredNonVegData);
  };

  const handleSearch = () => {
    if (value !== "") {
      const searchFilter = data.filter((items) =>
        items.strCategory.toLowerCase().includes(value.toLowerCase())
      );
      setFilter(searchFilter);
      setActiveButton("all")
    } else {
      showAllItems();
    }
  };
  const showAllItems = () => {
    setFilter(data);
  };

  useEffect(() => {
    fetchData();
  }, []);




  if (loading) return <div className="loader"></div>;

  return (
    <div className="Container">
      <section className="TopContainer">
      <div className="loogo">
  <h1>
    <img src={logo} alt="logo" />
    D<span className="green">r</span>y F<span className="green">r</span>y
  </h1>
</div>
        <div className="search">
          <input
            placeholder="Search here"
            value={value}
            onChange={(e) => {
            setValue(e.target.value);
            handleSearch(); 
          }}
          />
        </div>
      </section>
      <section className="FilterContainer">
      <button
  className={`btn ${activeButton === "all" ? "active" : ""}`}
  onClick={() => {
    showAllItems();
    setActiveButton("all");
  }}
>
  All items
</button>

<button
  className={`btn ${activeButton === "nonveg" ? "active" : ""}`}
  onClick={() => {
    handleNonVegClick();
    setActiveButton("nonveg");
  }}
>
  Non Vegetarian
</button>

<button
  className={`btn ${activeButton === "veg" ? "active" : ""}`}
  onClick={() => {
    handleVegClick();
    setActiveButton("veg");
  }}
>
  Vegetarian
</button>

      </section>
      <Cart data={filter} error={error}/>
    </div>
  );
}

export default App;
