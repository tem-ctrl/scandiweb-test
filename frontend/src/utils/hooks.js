import axios from 'axios'
import { useQuery } from 'react-query' //eslint-disable-next-line
import { API_URLS } from "../utils/constants"

/**
 * fetch products data using react-query
 * @returns {AxiosPromise} promise containing fetche data once resolved
 */
export function useFetch() {
  const fetchData = () => axios.get(API_URLS.get)
  return useQuery('product-data', fetchData)
}
