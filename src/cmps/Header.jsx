import { NavLink } from "react-router";


export function Header(){
    return(
        <div className="app-header">
        <h2>mistertoy</h2>
        <nav className="flex   align-center">
        <ul className="header-nav-list clean-list flex   align-center">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/toys'>toys</NavLink></li>
        </ul>
        </nav>
        </div>
    )
}