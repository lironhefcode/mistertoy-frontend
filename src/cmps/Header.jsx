import { NavLink, useLocation } from "react-router";
import { Logo } from "./Logo.jsx";
import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.action.js";

export function Header() {
    const user = useSelector(storeState => storeState.userMoudle.user)
    const location = useLocation().pathname
    const [open, setOpen] = useState(false)
    const [page, setpage] = useState(location)

    function toggleDrawer(state) {
        setOpen(state)
    }

    useEffect(() => {
        setpage(location)
    }, [location])

    return (
        <div className="app-header full main-layout">
           <div className="header-content">
            <Logo />
            
                {user&&(<div><span>hello {user.fullname}</span><button className="btn" onClick={logout}>logout</button></div>)}
                <button className="menu-opner" ><MenuIcon onClick={() => toggleDrawer(true)}/></button>
                <Drawer open={open} onClose={() => toggleDrawer(false)}>
                    <Box  sx={{ width: 250 }} role="presentation" onClick={()=> toggleDrawer(false)}>
                        <ul className="header-nav-list clean-list flex flex-column  align-center">
                            <li className={(page === '/') ? 'active' : ''}><NavLink  to='/'>Home</NavLink></li>
                            <li className={(page === '/about') ? 'active' : ''}><NavLink to='/about'>about</NavLink></li>
                            <li className={(page === '/toys') ? 'active' : ''}><NavLink to='/toys'>toys</NavLink></li>
                            <li className={(page === '/dashboard') ? 'active' : ''}><NavLink to='/dashboard'>dashboard</NavLink></li>
                            <li className={(page === '/login') ? 'active' : ''}><NavLink to='/login'>login</NavLink></li>
                        </ul>
                    </Box>
                </Drawer>
                
                </div>
        </div>
    )
}