import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `http://mmi.cdhyt.org/api/`,
  headers: {
    Authorization: 'JWT ' + localStorage.getItem('token')
  }
})
