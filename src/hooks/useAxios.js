import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { SearchContext } from '../App'

const useAxios = ({ dataUrl: url, activeCategory, activeSortType }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  //context
  const { searchValue } = useContext(SearchContext)

  let currentUrl = ''
  const currentActiveCategory = activeCategory > 0 ? 'category' : ''
  if (searchValue) {
    currentUrl = `${url}?search=${searchValue}`
  } else {
    currentUrl = `${url}?${currentActiveCategory}=${activeCategory}&sortBy=${activeSortType.sortBy}&order=asc`
  }

  const fetchData = () => {
    setLoading(true)
    axios
      .get(currentUrl)
      .then((response) => setResponse(response.data))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [url, activeCategory, activeSortType, searchValue])

  return { response, loading, error }
}

export default useAxios
