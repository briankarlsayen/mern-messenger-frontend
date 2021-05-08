import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:9000'
    baseURL: 'https://messenger-mern-back.herokuapp.com/'
})

export default instance