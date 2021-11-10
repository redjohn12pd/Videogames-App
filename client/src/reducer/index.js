import {
    GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, GET_PLATFORMS, FILTER_VIDEOGAMES,
    SORT_VIDEOGAMES, POST_VIDEOGAME
} from '../actions/constant.js';
import { sortAscAlpha, sortDescAlpha, sortAscRating, sortDescRating } from '../utilitys/SortingMethods.js';
const initialState = {
    auxVideogames: [],
    videogames: [],
    videogame: {},
    genres: [],
    platforms: [],
    filterVideogames: [],
    currentFilter: [],
    isEmpty:true,
}
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_VIDEOGAMES:
            const isEmpty = payload.length === 0? true: false
            return {
                ...state,
                videogames: payload,
                auxVideogames: payload,
                isEmpty,
            };
        case GET_VIDEOGAME:
            payload = payload.data[0]?payload.data[0]:payload.data;
            return {
                ...state,
                videogame: payload,
            };

        case FILTER_VIDEOGAMES:
            let filtered;
            if (!state.filterVideogames.length) {
                state.filterVideogames = [...state.auxVideogames]
            }

            switch (payload.value) {
                case "showAll":
                    return {
                        ...state,
                        videogames: [...state.auxVideogames],
                        currentFilter: [...state.auxVideogames]
                    }
                case "created":
                    filtered = state.filterVideogames.filter(g => `${g.id}`.length > 8);
                    return {
                        ...state,
                        videogames: filtered,
                        currentFilter: filtered
                    }
                case "existing":
                    filtered = state.filterVideogames.filter(g => `${g.id}`.length < 8);
                    return {
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
            if (state.currentFilter.length) {
                sortingGames = [...state.currentFilter];
                sortingFilterGames = [...state.filterVideogames];
            } else {
                sortingGames = [...state.auxVideogames];
            }

            if (payload.name === 'sortBy') {
                if (payload.value === 'rating') {
                    sortingGames = sortAscRating(sortingGames)
                    sortingFilterGames = sortingFilterGames ? sortAscRating(sortingFilterGames) : []
                    auxVideogames = sortAscRating(auxVideogames)
                } else {
                    sortingGames = sortAscAlpha(sortingGames);
                    sortingFilterGames = sortingFilterGames ? sortAscAlpha(sortingFilterGames) : [];
                    auxVideogames = sortAscAlpha(auxVideogames);
                }
            }
            else if (payload.name === 'sortingOrder') {
                switch (payload.sortBy) {
                    case 'rating':
                        if (payload.value === 'ascending') {
                            sortingGames = sortAscRating(sortingGames)
                            sortingFilterGames = sortingFilterGames ? sortAscRating(sortingFilterGames) : []
                            auxVideogames = sortAscRating(auxVideogames)
                        } else {
                            sortingGames = sortDescRating(sortingGames)
                            sortingFilterGames = sortingFilterGames ? sortDescRating(sortingFilterGames) : []
                            auxVideogames = sortDescRating(auxVideogames)
                        }
                        break;
                    case 'alphabetically':
                        if (payload.value === 'ascending') {
                            sortingGames = sortAscAlpha(sortingGames);
                            sortingFilterGames = sortingFilterGames ? sortAscAlpha(sortingFilterGames) : [];
                            auxVideogames = sortAscAlpha(auxVideogames);
                        } else {
                            sortingGames = sortDescAlpha(sortingGames);
                            sortingFilterGames = sortingFilterGames ? sortDescAlpha(sortingFilterGames) : [];
                            auxVideogames = sortDescAlpha(auxVideogames);
                        }
                        break;
                    default:
                        break;
                }
            }
            return {
                ...state,
                videogames: sortingGames,
                filterVideogames: sortingFilterGames,
                auxVideogames: auxVideogames
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: [...payload]
            }
        case GET_GENRES:
            return {
                ...state,
                genres: [...payload]
            }
        case POST_VIDEOGAME:
            return state;
        default:
            return state;
    }
}

