import { Navigation } from "./Navigation"
import { Link } from "react-router-dom"
import {useState,useEffect} from 'react'
export function Header(props) {
  const [name,setName]= useState()

  useEffect (()=> {
    if (props.user){
      setName(props.user.name)
    }else{
      setName(null)
    }

  })
  return (
    <header className="navbar bg-light navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <div className="collapse navbar-collapse">
          <Navigation items={props.headernav} />
          <p className="navbar-brand">{name}</p>
        </div>

      </div>
    </header>

  )

}