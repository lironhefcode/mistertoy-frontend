import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toys.service.js"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const toyLabels = toyService.getToyLabels()
export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])
    function handleChange({ target }) {
        let { value, name: field, type } = target
     
        switch (type) {
            case 'number':
                value = +value
            case 'select-multiple':
                value = Array.from(target.selectedOptions, option => option.value || [])
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { labels } = filterByToEdit
    return (
        <>
            <section className="toy-filter">
                <h2>Toy filter</h2>
                <form action="">
                    <div>
                        
                        <input type="text" placeholder="fillter by text" onChange={handleChange} name="txt" id="txt" />
                    </div>
                    <div>
                        <label htmlFor="inStock">stock Type</label>
                        <select onChange={handleChange} name="inStock" id="inStock">
                            <option value="all">all</option>
                            <option value="true">In stock</option>
                            <option value="false">Out of stock</option>
                        </select>
                    </div>
                    <FormControl  className="input">
                    <InputLabel color="black" id="demo-multiple-name-label">labels</InputLabel>
                    <Select
                       
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={labels || []}
                        onChange={handleChange}
                        input={<OutlinedInput   label="Name" />}
                        name="labels"
                        displayEmpty
                       
                    >
                        

                        {toyLabels.map((label) => (
                            <MenuItem key={label} value={label}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>

                    <div>
                        <label htmlFor="sortBy">sortBy</label>
                        <select onChange={handleChange} name="sortBy" id="sortBy">
                            <option value="name">name</option>
                            <option value="price">price</option>
                            <option value="created">Created</option>
                        </select>
                    </div>
                </form>
            </section>
        </>
    )
}