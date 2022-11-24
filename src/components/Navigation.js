import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export function Navigation(props){
    const [ navItems, setNavItems] = useState([])

    useEffect( ()=> {
        if(navItems.length == 0){
            setNavItems( props.items)
        }
    } ,[props.items]    )

    if( navItems.length > 0){
        //Navlinks collection, return a html code for each item in the array
        const NavigationLinks = navItems.map( ( item, itemKey ) => {
            return (
                <NavLink to = {item.path} className = "nav-link" key={itemKey}>{ item.name }</NavLink>
            )
        })
        return (
        
            <nav className="navbar-nav me-auto mb-2 mb-lg-0">
               { NavigationLinks }
            </nav>
    
        )

    }else{
        return null
    }

    

}