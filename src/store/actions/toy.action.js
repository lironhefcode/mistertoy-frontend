

import { toyService } from "../../services/toys.service.js"
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_MAX_PAGE, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"
export function loadToys(){
    const filterBy = store.getState().toysMoudle.filterBy
    return toyService.query(filterBy)
                            .then(({toys,maxPage}) =>{
                                store.dispatch({type:SET_TOYS,toys})
                                store.dispatch({type:SET_MAX_PAGE,maxPage})
                            }
                             )
                             .catch(err => {
                                console.log('toy action -> Cannot load toy', err)
                                throw err
                            })
}
export function saveToy(toy){
const type = toy._id? UPDATE_TOY:ADD_TOY
return toyService.save(toy)
                        .then(Savedtoy=>{
                            store.dispatch({type,toy: Savedtoy})
                            return Savedtoy
                        })
                        .catch(err => {
                            console.log('toy action -> Cannot save toy', err)
                            throw err
                        })
}

export function removeToy(toyId) {
	return toyService
		.remove(toyId)
		.then(() => {
			store.dispatch({ type: REMOVE_TOY, toyId })
		})
		.catch(err => {
			console.log('toy action -> Cannot remove toy', err)
			throw err
		})
}


export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}