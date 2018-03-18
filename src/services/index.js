import axios from 'axios'

export const HTTP = axios.create({
  // baseURL: `http://mmi.cdhyt.org/api/`,
  baseURL: localStorage.getItem('baseURL'),
  headers: {
    Authorization: 'JWT ' + localStorage.getItem('token'),
    'Accept-Language': 'es_ES'
  }
})
