import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = ({ dataUrl: url }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = () => {
    axios
      .get(url)
      .then((response) => setResponse(response.data))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { response, loading, error }
}

export default useAxios
