import Categories from '../components/Categories'
import Sorting from '../components/Sorting'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import useAxios from '../hooks/useAxios'
import { useEffect, useState } from 'react'

const dataUrl = 'https://63612c1eaf66cc87dc251bdc.mockapi.io/items'

const Home = () => {
  const [items, setItems] = useState([])
  const { response, loading, error } = useAxios({ dataUrl })

  useEffect(() => {
    if (response !== null) {
      setItems(response)
    }
  }, [response])
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sorting />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading ? (
          [...new Array(6)].map((_, index) => {
            return <Skeleton key={index} />
          })
        ) : (
          <>
            {error && <p>{error.message}</p>}

            {items &&
              items.map((pizza) => {
                return <PizzaBlock key={pizza.id} {...pizza} />
              })}
          </>
        )}
      </div>
    </>
  )
}

export default Home
