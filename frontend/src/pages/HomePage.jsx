import { useEffect } from "react"
import { IsLoading, ErrorHome, ListData } from "../components"
import { useFetch } from "../utils/hooks"
import { prepareData } from '../utils/utils'
import { useLocation } from "react-router-dom"

const HomePage = () => {

  const { isLoading, data, isError, error } = useFetch()

  const location = useLocation()
  // Clear toDeleteList if location changes without clicking 'Mass Delete'
  useEffect(() => {
    sessionStorage.clear()
  }, [location])

  // IsLoading is an empty component, just for scalability
  if (isLoading) return <IsLoading />
  if (isError) return <ErrorHome message={error.message} />
  const preparedData = data.data !== "" ? data.data.map(prepareData) : []

  return (
    <ListData data={preparedData} />
  )
}

export default HomePage
