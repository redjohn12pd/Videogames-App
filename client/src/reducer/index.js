import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS, FILTER_VIDEOGAMES} from '../actions/constant.js';
const initialState = {
    auxVideogames: [],
    videogames: [],
    genres: [],
    filterVideogames: []
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
                videogames: action.payload,
                auxVideogames: action.payload,
            };

        case FILTER_VIDEOGAMES:
            let filtered;
            if(!state.filterVideogames.length){
                state.filterVideogames = [...state.auxVideogames]
            }
            switch (action.payload.value) {
                   case "showAll":
                    return{
                        ...state,
                        videogames: [...state.auxVideogames],
                    }
                    case "created":
                        filtered = state.filterVideogames.filter(g=>`${g.id}`.length>8);
                    return{
                        ...state,
                        videogames: filtered
                    }
                    case "existing":
                        filtered = state.filterVideogames.filter(g=>`${g.id}`.length<8);
                    return{
                        ...state,
                        videogames: filtered
                    }
            
                default:
                    break;
            }
        default:
            return state;
    }
}

