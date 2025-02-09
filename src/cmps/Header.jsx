import { NavLink, useLocation } from "react-router";
import { Logo } from "./Logo.jsx";
import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
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
            
                <button className="menu-opner" ><MenuIcon onClick={() => toggleDrawer(true)}/></button>
                <Drawer open={open} onClose={() => toggleDrawer(false)}>
                    <Box  sx={{ width: 250 }} role="presentation" onClick={()=> toggleDrawer(false)}>
                        <ul className="header-nav-list clean-list flex flex-column  align-center">
                            <li className={(page === '/') ? 'active' : ''}><NavLink  to='/'>Home</NavLink></li>
                            <li className={(page === '/about') ? 'active' : ''}><NavLink to='/about'>about</NavLink></li>
                            <li className={(page === '/toys') ? 'active' : ''}><NavLink to='/toys'>toys</NavLink></li>
                            <li className={(page === '/dashboard') ? 'active' : ''}><NavLink to='/dashboard'>dashboard</NavLink></li>
                        </ul>
                    </Box>
                </Drawer>
                
                </div>
        </div>
    )
}