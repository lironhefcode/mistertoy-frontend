import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"



export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])
    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(type)
        switch (type) {
            case 'number':
                value = +value
            case 'select-one':
                if (value === 'true') value = true
                if (value === 'false') value = false
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <>
            <section>
                <h2>Toy filter</h2>
                <form action="">
                    <label htmlFor="txt"></label>
                    <input type="text" onChange={handleChange} name="txt" id="txt" />

                    <label htmlFor="inStock">stock Type</label>
                    <select onChange={handleChange} name="inStock" id="inStock">
                        <option value="all">all</option>
                        <option value="true">In stock</option>
                        <option value="false">Out of stock</option>
                    </select>

                    <label htmlFor="sortBy">sortBy</label>
                    <select onChange={handleChange} name="sortBy" id="sortBy">
                        <option value="name">name</option>
                        <option value="price">price</option>
                        <option value="created">Created</option>
                    </select>
                </form>
            </section>
        </>
    )
}