import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header'
import { Footer } from './components/Footer';

const NavData = [
  {name : "Home", path: "/",public: true},
  {name : "About", path: "/about",public: true},
  {name : "Contact", path: "/",public: true}
]
function App() {
  return (

    <div className="App">
     
      <Header title= "My app" headernav={NavData}/>
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



      {/*<footer>
        <div className="container-fluid">
          <p>Footer</p>
        </div>
</footer>*/}
    <Footer year="2022"/>
</div>

  );
}

export default App;
