import { Link } from "react-router-dom"



export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Instock: <span>{toy.inStock ? 'yes' : 'no'}</span></p>
            <button className="btn">
                <Link to={`/toys/${toy._id}`}>Details</Link>
            </button>
            <button className="btn">
                <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
            </button>
        </article>
    )
}