import React, { useEffect, useState } from "react";
import Car from "./components/car";
const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("api/v1/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  console.log(cars);

  return (
    <div>
      <h1>Welcome to the Car Store</h1>
      <ul>
        {cars.map((car) => (
          <Car key={car.id} {...car} />
        ))}
      </ul>
    </div>
  );
};

export default App;
