import { ToyPreview } from "./ToyPreview.jsx";


export function ToysList({toys}){

    console.log(toys)
    return (
        
           <ul className="toy-list">
            {toys.map(toy =>
                <li className=" clean-list" key={toy._id}>
                    <ToyPreview toy={toy} />

                    {/* <div>
                        <button onClick={() => onRemoveCar(toy._id)}>x</button>
                        <button onClick={() => onEditCar(toy)}>Edit</button>
                    </div> */}

                 
                </li>)}
       
        </ul>


    )


}