import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = ({ dataUrl: url }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchData = () => {
    axios
      .get(url)
      .then((response) => setResponse(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { response, loading, error }
}

export default useAxios
