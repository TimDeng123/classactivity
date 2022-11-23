import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header'
function App() {
  return (
    <div className="App">
     {/* <nav className="navbar bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Web</a>
        </div>
  </nav> */}
      <Header title= "My app"/>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h3>Column 1</h3>
          </div>
          <div className="col">
            <h3>Column 2</h3>
          </div>
          <div className="col">
            <h3>Column 3</h3>

          </div>
        </div>
      </div>



      <footer>
        <div className="container-fluid">
          <p>Footer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
