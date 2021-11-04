import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS, FILTER_VIDEOGAMES} from '../actions/constant.js';
const initialState = {
    videogames: [],
    genres: [],
    filterVideogames:[]
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_GENRES:
                return{
                    ...state,
                    genres:action.payload
                };
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload
            };

        case FILTER_VIDEOGAMES:
            return{
                ...state,
                filterVideogames: action.payload
            }
        default:
            return state;
    }
}

