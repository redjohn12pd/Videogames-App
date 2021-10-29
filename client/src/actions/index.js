import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS} from './constant.js';
const axios = require('axios').default;
const URL = "http://localhost:3001/api";

export function getVideogames(payload){
    return function(dispatch){
        axios.get(`${URL}/videogames${payload ? "?name=" + payload:""}`)
        .then(videogames=>{
            console.log(videogames.data)
            dispatch({type: GET_VIDEOGAMES,payload:videogames.data})
        });
    }
}
export function getVideogame(payload){
    return function(dispatch){
        axios.get(`${URL}/videogames/${payload}`)
    }
}