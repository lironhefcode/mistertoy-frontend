import { Link } from "react-router-dom"



export function ToyPreview({toy}){

    return(
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Instock: <span>{toy.inStock? 'yes':'no'}</span></p>
           <Link to={`/toys/${toy._id}`}>Details</Link>
           <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
        </article>
    )
}