import { useSelector } from "react-redux"
import { toyService } from "../services/toys.service.js"
import { useEffect } from "react"
import { loadToys, setFilterBy } from "../store/actions/toy.action.js"
import { ToysList } from "../cmps/ToysList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
export function ToyesIndex(){

    const toys = useSelector(storeState => storeState.toysMoudle.toys )
    const filterBy = useSelector(storeState => storeState.toysMoudle.filterBy )
    useEffect(() =>{
        loadToys()
    },[filterBy])

    function onSetFilter(filterBy){

        setFilterBy(filterBy)
    }
    

    return (
        <>
        <h1>toys index</h1>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
        <ToysList toys={toys}/>
        </>
    )

}