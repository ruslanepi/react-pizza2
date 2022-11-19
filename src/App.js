import './App.css'
import './scss/app.scss'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import { useState, createContext } from 'react'

import { Routes, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slices/filterSlice'

export const SearchContext = createContext('')

function App() {
  const [searchValue, setSearchValue] = useState('')

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <button onClick={() => dispatch(increment())}>incr</button>
        {count}
        <button onClick={() => dispatch(decrement())}>decr</button>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
