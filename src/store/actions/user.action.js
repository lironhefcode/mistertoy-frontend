import { userService } from "../../services/user.service.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"




export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }

}

export  async function signup(credentials) {
    try{
        const user  = userService.signup(credentials)
        store.dispatch({type: SET_USER,user})
        return user
    }catch(err){
        console.error('Cannot signup:', err)
            throw err
    }
   
}

export async function logout() {
    
       try{
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
       }catch(err){
        console.error('Cannot logout:', err)
            throw err
       }
            
     
}