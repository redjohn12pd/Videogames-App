import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS} from './constant.js';
const axios = require('axios').default;
const URL = "http://localhost:3001/api";


export function getGenres(){
    return function(dispatch){
        axios.get(`${URL}/genres`)
        .then(genres=>{
            dispatch({type: GET_GENRES,payload:genres.data})
        });
    }
}

export function getVideogames(payload){
    return function(dispatch){
        axios.get(`${URL}/videogames${payload ? "?name=" + payload:""}`)
        .then(videogames=>{
            dispatch({type: GET_VIDEOGAMES,payload:videogames.data})
        });
    }
}
export function getVideogame(payload){
    return function(dispatch){
        axios.get(`${URL}/videogames/${payload}`)
        .then(videogame=>{
            dispatch({type: GET_VIDEOGAME,payload:videogame})
        });
    }
}

