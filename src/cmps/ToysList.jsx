import { Link } from "react-router";
import { ToyPreview } from "./ToyPreview.jsx";


export function ToysList({ toys,onRemoveToy }) {


    return (

        <ul className="toy-list">
            {toys.map(toy =>
                <li className=" clean-list" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <button className="btn">
                        <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
                    </button>
                    <button onClick={()=> onRemoveToy(toy._id)} className="btn">
                        remove
                    </button>
                </li>)}

        </ul>


    )


}