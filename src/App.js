import Header from './components/Header'
import Categories from './components/Categories'
import Sorting from './components/Sorting'
import PizzaBlock from './components/PizzaBlock'
import './App.css'
import './scss/app.scss'

import pizzas from './assets/pizzas.json'

function App() {
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
            {pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
