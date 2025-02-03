import { useState } from "react"
import { useParams } from "react-router"
import { toyService } from "../services/toys.service.js"
import { useEffect } from "react"



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])
    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => console.log('Had issues in toy details', err))
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-detarils">
            <h2>{toy.name}</h2>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Instock: <span>${toy.inStock? 'yes':'no'}</span></p>
            <ul>
                {toy.labels.map(label =>
                     <li key={label}>{label}</li>
                )}
            </ul>
        </section>
    )

}