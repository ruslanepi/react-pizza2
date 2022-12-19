import qs from 'qs' // библиотека для превращение объекта в строку для подстановки в url
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Sorting from '../components/Sorting'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

import { useEffect, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../redux/slices/filterSlice'

import { SearchContext } from '../App'
import { fetchPizzas } from '../redux/slices/pizzaSlice'

const dataUrl = 'https://63612c1eaf66cc87dc251bdc.mockapi.io/items'

const Home = () => {
  const { searchValue } = useContext(SearchContext)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { items, status } = useSelector((state) => state.pizza)
  const { activeCategoryId, activeSortType } = useSelector((state) => state.filter)

  const getPizzas = async () => {
    let currentUrl = ''
    const currentActiveCategory = activeCategoryId > 0 ? 'category' : ''
    if (searchValue) {
      currentUrl = `${dataUrl}?search=${searchValue}`
    } else {
      currentUrl = `${dataUrl}?${currentActiveCategory}=${activeCategoryId}&sortBy=${activeSortType.sortBy}&order=asc`
    }

    dispatch(fetchPizzas(currentUrl))
  }

  //парсинг строки из url, обновление state ИЗ url
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)
      dispatch(
        setFilters({
          ...params,
        }),
      )
      isSearch.current = true
    }
  }, [])

  //отработка qs, если изменили параметры и уже был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: activeCategoryId,
        sortType: activeSortType.sortBy,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [activeCategoryId, activeSortType])

  //запрос на пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false

    window.scroll(0, 0)
  }, [])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sorting />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'loading' ? (
          [...new Array(6)].map((_, index) => {
            return <Skeleton key={index} />
          })
        ) : (
          <>
            {items &&
              items.map((pizza) => {
                return <PizzaBlock key={pizza.id} {...pizza} />
              })}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
