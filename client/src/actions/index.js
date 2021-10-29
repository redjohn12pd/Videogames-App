require('dotenv').config()
import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS} from './constant.js';
const axios = require('axios').default;
const {URL,KEY} = process.env;

export function getVideogames(payload){
    return function(dispatch){
        axios.get(`${URL}/videogames${payload && "?name=" + payload}&key=${KEY}`)
        .then(videogames=>{
            dispatch({type: GET_VIDEOGAMES,payload:videogames})
        });
    }
}