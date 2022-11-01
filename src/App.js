import Header from './components/Header'
import Categories from './components/Categories'
import Sorting from './components/Sorting'
import PizzaBlock from './components/PizzaBlock'
import Skeleton from './components/PizzaBlock/Skeleton'
import './App.css'
import './scss/app.scss'

import useAxios from './hooks/useAxios'

import { useEffect } from 'react'
import { useState } from 'react'

const dataUrl = 'https://63612c1eaf66cc87dc251bdc.mockapi.io/items'

function App() {
  const [items, setItems] = useState([])
  const { response, loading, error } = useAxios({ dataUrl })

  useEffect(() => {
    if (response !== null) {
      setItems(response)
    }
  }, [response])

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
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
        </div>
      </div>
    </div>
  )
}

export default App
