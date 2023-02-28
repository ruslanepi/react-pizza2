import qs from "qs"; // библиотека для превращение объекта в строку для подстановки в url
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import NotFound from "./NotFound";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterData, setFilters } from "../redux/slices/filterSlice";

import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const dataUrl = "https://63612c1eaf66cc87dc251bdc.mockapi.io/items";

const Home = () => {
  const { searchValue } = useSelector(selectFilterData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { activeCategoryId, activeSortType } = useSelector(selectFilterData);

  let currentUrl = "";
  const currentActiveCategory = activeCategoryId > 0 ? "category" : "";
  if (searchValue) {
    currentUrl = `${dataUrl}?search=${searchValue}`;
  } else {
    currentUrl = `${dataUrl}?${currentActiveCategory}=${activeCategoryId}&sortBy=${activeSortType.sortBy}&order=asc`;
  }

  const getPizzas = async () => {
    console.log("получаем пиццы");
    dispatch(
      //@ts-ignore
      fetchPizzas(currentUrl)
    );
  };

  //парсинг строки из url, обновление state ИЗ url
  useEffect(() => {
    console.log("1ый");
    if (window.location.search) {
      console.log("1ый выполняем");
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      dispatch(
        setFilters({
          ...params,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //отработка qs, если изменили параметры и уже был первый рендер
  useEffect(() => {
    console.log("2ой");
    if (isMounted.current) {
      console.log("2ой выполняем");
      const queryString = qs.stringify({
        categoryId: activeCategoryId,
        sortType: activeSortType.sortBy,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategoryId, activeSortType, searchValue]);

  //запрос на пиццы
  useEffect(() => {
    console.log("3ий");
    if (!isSearch.current) {
      console.log("3ий выполняем");
      getPizzas();
    }
    isSearch.current = false;

    window.scroll(0, 0);
  }, [activeCategoryId, activeSortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sorting />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {status === "error" ? (
          <NotFound />
        ) : status === "loading" ? (
          [...new Array(6)].map((_, index) => {
            return <Skeleton key={index} />;
          })
        ) : (
          <>
            {items &&
              items.map((obj: any) => {
                return <PizzaBlock key={obj.id} {...obj} />;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
