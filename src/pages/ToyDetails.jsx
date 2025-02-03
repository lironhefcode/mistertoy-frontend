import { useState } from "react"
import { useParams } from "react-router"
import { toyService } from "../services/toys.service.js"
import { useEffect } from "react"
import { Popup } from "../cmps/Popup.jsx"
import { Chat } from "../cmps/chat.jsx"



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [popUp,setPopup] =  useState(false)

    const { toyId } = useParams()
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])
    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => console.log('Had issues in toy details', err))
    }
    function onSetPopup(){
        setPopup(prevPopup => !prevPopup)
    }


    if (!toy) return <div>Loading...</div>


    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Instock: <span>{toy.inStock? 'yes':'no'}</span></p>
            <h2>labels</h2>
            <ul className="label-list clean-list">
                {toy.labels.map(label =>
                     <li key={label}>{label}</li>
                )}
            </ul>
            <button className="openChat" onClick={onSetPopup}>popUp</button>
            {popUp&&<Popup onSetPopup={onSetPopup} header="Chat with Us" footer="We are here to help!">
                <Chat/>
                </Popup>}
        </section>
    )

}