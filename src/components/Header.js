export function Header(props){
    return (
        <nav className="navbar bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">{props.title}</a>
        </div>
      </nav>

    )

}