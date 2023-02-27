import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    axios
      .get(`https://63612c1eaf66cc87dc251bdc.mockapi.io/items/${id}`)
      .then(function (response) {
        console.log(response.data);
        setPizza(response.data);
      })
      .catch((error) => {
        alert(error);
        navigate("/");
      });
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" width={300} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} р</h4>
    </div>
  );
};

export default FullPizza;
