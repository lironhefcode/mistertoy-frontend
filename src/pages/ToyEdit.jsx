import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { toyService } from "../services/toys.service.js";
import { saveToy } from "../store/actions/toy.action.js";




export function ToyEdit(){
    const navigate = useNavigate()
const [ToyToEdit,setToyToEdit] = useState(toyService.getEmptyToy())
const {toyId} = useParams()
    useEffect(() =>{
        if (toyId) loadToy()
    },[])

    function loadToy() {
            toyService.getById(toyId)
                .then(toy => setToyToEdit(toy))
                .catch(err => console.log('Had issues in toy details', err))
        }
    function handleChange({target}){
        let { value, type, name: field } = target
        switch(type){
            case 'number':
                value = +value
            case 'checkbox':
                value = (value==='checked')
        }
        setToyToEdit(prevToy => ({...prevToy,[field]:value}))
    }

    function onSaveToy(ev){
        ev.preventDefault()
        saveToy(ToyToEdit).then(()=>
            navigate('/toys')
        )
    }

    return(
        <>
        <section className="toy-edit">
            <form action="" onSubmit={onSaveToy}>
                <label htmlFor="name"></label>
                <input type="text" onChange={handleChange} name="name" id="name" value={ToyToEdit.name} />

                <label htmlFor="price"></label>
                <input type="number" name="price" onChange={handleChange} id="price" value={ToyToEdit.price} />
                
                <label htmlFor="inStock"></label>
                <input type="checkbox" name="inStock" onChange={handleChange} id="inStock" checked={(ToyToEdit.instock)} />
                <button type="submit">Save</button>
            </form>
        </section>
        </>
    )
}