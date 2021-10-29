import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS} from '../actions/constant.js';
const initialState = {
    videogames: []
}

export default function reducer(state = initialState, {type,payload}){
    switch (type) {
        case GET_VIDEOGAMES:
            return{
                ...initialState,
                videogames: payload
            };
    
        default:
            return state;
    }
}

