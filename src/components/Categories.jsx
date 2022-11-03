import React from 'react'

const Categories = ({ onClickActiveCategory, activeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Вкусные']

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickActiveCategory(index)}
              className={index === activeCategory ? 'active' : ''}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
