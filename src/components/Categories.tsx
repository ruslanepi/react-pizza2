import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveCategoryId,
  setActiveCategoryId,
} from "../redux/slices/filterSlice";

const categories = ["Все", "Мясные", "Вегетарианские", "Вкусные"];

const Categories = () => {
  const activeCategoryId = useSelector(selectActiveCategoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setActiveCategoryId(index))}
              className={index === activeCategoryId ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
