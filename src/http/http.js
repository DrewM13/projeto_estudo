import axios from 'axios'

const http = axios.create({
  baseURL: "http://localhost:3000/"
})
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
   if(token){
     config.headers.Authorization =  `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      localStorage.setItem('token','')
      window.location.href = 'http://localhost:8080/'
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)


export { http }
