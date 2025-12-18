import { useEffect, useState } from "react";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/food`)
      .then(res => res.json())
      .then(data => setFoodList(data));
  }, []);

  return (
    <div>
      {foodList.map(item => (
        <div key={item._id}>
          <img src={`${API_URL}/images/${item.image}`} alt={item.name} />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
