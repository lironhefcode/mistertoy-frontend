import { NavLink, useLocation } from "react-router";
import { Logo } from "./Logo.jsx";
import { useEffect, useState } from "react";


export function Header(){
    const location = useLocation().pathname
  
    const [page,setpage] = useState(location)
    useEffect(() =>{
            setpage(location)
    },[location])
    
    return(
        <div className="app-header">
       <Logo/>
        <nav className="flex   align-center">
        <ul className="header-nav-list clean-list flex   align-center">
            <li className={(page==='/')? 'active':''}><NavLink to='/'>Home</NavLink></li>
            <li className={(page==='/toys')? 'active':''}><NavLink to='/toys'>toys</NavLink></li>
        </ul>
        </nav>
        </div>
    )
}