import axios from 'axios';

const api = axios.create({    
    baseURL: 'http://192.168.0.22:3333',

})
// baseURL: 'http://192.168.0.22:3333',
// export default api; 
// http://192.168.43.24:3333 porta do meu celular
export {api}; 
