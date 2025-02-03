import { NavLink } from "react-router";


export function Header(){
    return(
        <div className="app-header">
        <h2>mistertoy</h2>
        <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/toys'>toys</NavLink></li>
        </ul>
        </nav>
        </div>
    )
}