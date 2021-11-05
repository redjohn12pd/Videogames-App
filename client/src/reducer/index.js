import {GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS, FILTER_VIDEOGAMES,
SORT_VIDEOGAMES} from '../actions/constant.js';
import {sortAscAlpha, sortDescAlpha, sortAscRating, sortDescRating} from '../utilitys/SortingMethods.js';
const initialState = {
    auxVideogames: [],
    videogames: [],
    genres: [],
    platforms: [],
    filterVideogames: [],
    currentFilter:[]
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
                        currentFilter: [...state.auxVideogames]
                    }
                    case "created":
                        filtered = state.filterVideogames.filter(g=>`${g.id}`.length>8);
                    return{
                        ...state,
                        videogames: filtered,
                        currentFilter: filtered
                    }
                    case "existing":
                        filtered = state.filterVideogames.filter(g=>`${g.id}`.length<8);
                    return{
                        ...state,
                        videogames: filtered,
                        currentFilter: filtered
                    }
            
                default:
                    return state;
            }
            
            case SORT_VIDEOGAMES:
                let sortingGames, sortingFilterGames;
                let auxVideogames = [...state.auxVideogames];
                if(state.currentFilter.length){
                    sortingGames =  [...state.currentFilter];
                    sortingFilterGames = [...state.filterVideogames];
                }else{
                    sortingGames = [...state.auxVideogames];
                }
                
                    if(action.payload.name === 'sortBy'){
                        if(action.payload.value === 'rating'){
                        sortingGames = sortAscRating(sortingGames)
                        sortingFilterGames = sortingFilterGames ? sortAscRating(sortingFilterGames):[]
                        auxVideogames = sortAscRating(auxVideogames)
                        }else{
                            sortingGames = sortAscAlpha(sortingGames);
                            sortingFilterGames = sortingFilterGames?sortAscAlpha(sortingFilterGames):[];
                            auxVideogames = sortAscAlpha(auxVideogames);
                        }
    
                        
                    }else{
                        if(action.payload.sortBy === 'rating'){
                            action.payload.value === 'descendent'? sortingGames.sort((a,b)=>b-a):sortingGames.sort((a,b)=>a-b)
                        }
                    }
                        
                return{
                    ...state,
                    videogames: sortingGames,
                    filterVideogames: sortingFilterGames,
                    auxVideogames: auxVideogames
                }

        default:
            return state;
    }
}

