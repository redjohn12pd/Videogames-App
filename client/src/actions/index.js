import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS,
FILTER_VIDEOGAMES, SORT_VIDEOGAMES, POST_VIDEOGAME} from './constant.js';
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
export function getPlatforms(){
    return function(dispatch){
        axios.get(`${URL}/platforms`)
        .then(platforms=>{
            dispatch({type: GET_PLATFORMS,payload:platforms.data})
        });
    }
}
export function getVideogames(payload){
    return function(dispatch){
        axios.get(`${URL}/videogames${payload ? "?"+ payload.type+"=" + payload.value:""}`)
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
export function postVideogame(payload){
    return function(dispatch){
        axios.post(URL+'/videogames',payload)
        .then(response=>dispatch({type: POST_VIDEOGAME, payload:response}))
    }
}
export function filterVideogames(payload){
    return{
        type: FILTER_VIDEOGAMES,
        payload
    }
}
export function sortVideogames(payload){
    return{
        type: SORT_VIDEOGAMES,
        payload
    }
}
