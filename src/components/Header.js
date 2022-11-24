import { Navigation } from "./Navigation"

export function Header(props){
    
    return (
        <header className="navbar bg-light navbar-expand-lg">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">{props.title}</a>
        <div className="collapse navbar-collapse">
          <Navigation item={props.headernav}/>
        </div>
          
        </div>
      </header>

    )

}