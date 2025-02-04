import { useSelector } from "react-redux"
import { toyService } from "../services/toys.service.js"
import { useEffect } from "react"
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.action.js"
import { ToysList } from "../cmps/ToysList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { Link, NavLink } from "react-router"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { PaginationButtons } from "../cmps/PaginationButtons.jsx"
export function ToyesIndex() {

    const toys = useSelector(storeState => storeState.toysMoudle.toys)
    const filterBy = useSelector(storeState => storeState.toysMoudle.filterBy)
    const maxPage = useSelector(storeState => storeState.toysMoudle.maxPage)
    console.log(maxPage)
    useEffect(() => {
        loadToys()
    }, [filterBy])

    function onSetFilter(filterBy) {

        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {loadToys()
                showSuccessMsg('removed toy succesfully')
            })
            .catch(err => {
                showErrorMsg('cant remove toy')
                console.log(err)})
    }
    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        onSetFilter({ pageIdx: newPageIdx })
      }
    console.log(maxPage)
    return (
        <>
            <div className="toy-index-header flex justify-center">
                <h1>toys index</h1>
                <button className="btn">
                    <Link to='/toys/edit'>Add Toy</Link>
                </button>
            </div>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <PaginationButtons pageIdx={filterBy.pageIdx} onChangePageIdx={onChangePageIdx}/>
            <ToysList onRemoveToy={onRemoveToy} toys={toys} />
        </>
    )

}