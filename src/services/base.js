import axios from "axios";

const API_URL = 'http://localhost:5000'

const apiClient = axios.create({
    baseURL: API_URL, // TODO: put API_URL in ENV variables
  });

  apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = localStorage.getItem("userToken"); // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYzZjk3OWRkNzQ3MTRlM2M3OWU2MGMiLCJpYXQiOjE1OTMwNDc1MzF9.QFALDmilmSC-0mv873QVkLa1ftju78e9DSinl0hK30o';
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    apiClient.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    console.log(error)
    if (error.message.endsWith('404')) {
      return {statusCode: '404', 
              message: 'No se encontraron resultados'}
    }
    if (error.message.endsWith('401')) {
      return {statusCode : '401', 
              message: 'Usted no está autorizado para entrar a esta página.'}
    }
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  });
  
  const { get, post, put, delete: destroy } = apiClient;
  export { get, post, put, destroy };