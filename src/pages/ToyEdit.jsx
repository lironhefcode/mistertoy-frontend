import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { toyService } from "../services/toys.service.js";
import { saveToy } from "../store/actions/toy.action.js";
import { showSuccessMsg } from "../services/event-bus.service.js";




export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, settoyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const labels = toyService.getToyLabels()
    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => settoyToEdit(toy))
            .catch(err => console.log('Had issues in toy details', err))
    }
    function handleChange({ target }) {
        let { value, type, name: field } = target
        console.log(value, type, field)
        switch (type) {
            case 'number':
                value = value === "" ? "" : +value
                break;
            case 'checkbox':
                value = (value === 'checked')
        }
        settoyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function handleLabelChange({ target }) {
        const value = target.value
        settoyToEdit(prevToy => {
          const newLabels = prevToy.labels.includes(value)
            ? prevToy.labels.filter(label => label !== value)
            : [...prevToy.labels, value]
          return { ...prevToy, labels: newLabels }
        })
      }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit).then(() =>{
            showSuccessMsg('saved toy succsefuly')
            navigate('/toys')
        }
        )
    }
    const {  labels: selectedLabels } = toyToEdit
    return (
        <>
            <section className="toy-edit">
                <h2 className="title">Toy edit</h2>
                <form action="" onSubmit={onSaveToy}>
                    <div>
                        <label htmlFor="name">name:</label>
                        <input type="text" onChange={handleChange} name="name" id="name" value={toyToEdit.name} />
                    </div>
                    <div>
                        <label htmlFor="price">price:</label>
                        <input type="number" name="price" onChange={handleChange} id="price" value={toyToEdit.price||''} />
                    </div>
                    <div>
                        <label htmlFor="inStock">is in stock:</label>
                        <input type="checkbox" name="inStock" onChange={handleChange} id="inStock" checked={(toyToEdit.inStock)} />
                    </div>
                    
                
                    <fieldset className="labels-container">
                        <legend>labels</legend>
                        {labels.map(label => (
                            <>
                                <input
                                    type="checkbox"
                                    id={label}
                                    value={label}
                                    checked={selectedLabels.includes(label)}
                                    onChange={handleLabelChange}
                                />
                                <label className="edit-tag" htmlFor={label}>{label}</label>
                            </>
                        ))}
                    </fieldset>
                    <button className="btn" type="submit">Save</button>
                </form>
            </section>
        </>
    )
}