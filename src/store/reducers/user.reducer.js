import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'


const initialState = {
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        default:
            return state
    }
}