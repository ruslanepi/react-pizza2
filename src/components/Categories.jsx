import React from 'react'
import { useState } from 'react'

const Categories = () => {
  const [activeMenu, setActiveMenu] = useState(0)
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Вкусные']

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => setActiveMenu(index)}
              className={index === activeMenu ? 'active' : ''}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
