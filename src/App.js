import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import Main from './Main.js';
import logo from './logo.jpg';
import About from './About';

function App() {
  return (
    <div className="App">
      <Router>
        <nav id="nav">
          <div id="about-div" className="mr-auto">
            <Link to='/about'>
              <button className="btn btn-dark">About</button>
            </Link>
          </div>
          <div id="try-div" className="ml-auto">
            <Link to='/'>
              <button className="btn btn-dark">Try Now</button>
            </Link>
          </div>
        </nav>
        <div className="container mt-5" id="title-div">
          <h1 className="display-2 text-center mr-3" id="title">Trace The Bug</h1>
          <img id="logo" src={logo}></img>
        </div>

        <Switch>
          <Route exact path="/">
            <br/>
            <br/>
            <br/>
            <br/>
            <Main />
          </Route>
          <Route path="/about">
            <br/>
            <br/>
            <br/>
            <br/>
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
