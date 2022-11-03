import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = ({ dataUrl: url, activeCategory, activeSortType }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = () => {
    setLoading(true)
    axios
      .get(
        `${url}?${activeCategory > 0 ? 'category' : ''}=${activeCategory}&sortBy=${
          activeSortType.sortBy
        }&order=asc`,
      )
      .then((response) => setResponse(response.data))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [url, activeCategory, activeSortType])

  return { response, loading, error }
}

export default useAxios
