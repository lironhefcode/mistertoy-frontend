import { toyService } from "../../services/toys.service.js"

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_MAX_PAGE = 'SET_MAXPAGE'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    maxPage: 0
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:

            return { ...state, toys: action.toys }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, action.toy] }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }
        case REMOVE_TOY:

            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case SET_FILTER_BY:
            return {
                ...state, filterBy: { ...state.filterBy, ...action.filterBy }
            }
        case SET_MAX_PAGE:
            return { ...state, maxPage: action.maxPage }
        default:
            return state
    }
}