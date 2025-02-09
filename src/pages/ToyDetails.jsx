import { useState } from "react"
import { useParams } from "react-router"
import { toyService } from "../services/toys.service.js"
import { useEffect } from "react"
import { Popup } from "../cmps/Popup.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { ToyImg } from "../cmps/ToyImg.jsx"
import chatImg from '../assets/imgs/chat.png'


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

  const labelTxt = toy.labels.join(',')
    return (
        <section className="toy-details">
            <h2 className="title">{toy.name}</h2>
            <div className="toy-details-container">
            <ToyImg toyName={toy.name} />
            <div className="toy-info">
            <p> <span>Price:</span>  ${toy.price.toLocaleString()}</p>
            <p><span> Instock:</span> {toy.inStock? 'yes':'no'}</p>
            <div> <span>labels:</span> {labelTxt}</div>
            </div>
            </div>
          
            <button className="openChat" onClick={onSetPopup}>
                <img  src={chatImg} alt="" />
            </button>
            {popUp&&<Popup onSetPopup={onSetPopup} header="Chat with Us" footer="We are here to help!">
                <Chat/>
                </Popup>}
        </section>
    )

}