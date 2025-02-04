import { Link, useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { ToyImg } from "./ToyImg"


export function ToyPreview({ toy }) {
    const navigate = useNavigate()
    return (
        <Link to={`/toys/${toy._id}`}>
            <article onClick={() => navigate(`/toys/${toy._id}`)} className="toy-preview">
                <h4>{toy.name}</h4>
                <ToyImg toyName={toy.name} />
                <p>Price: <span>${toy.price.toLocaleString()}</span></p>
                <p>Instock: <span>{toy.inStock ? 'yes' : 'no'}</span></p>
            </article>
        </Link>
    )
}