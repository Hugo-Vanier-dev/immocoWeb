import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import CreateClient from './components/Clients/CreateClient';
import ReadClient from './components/Clients/ReadClient';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
          <div className="App">
            <Nav />
            <switch>
            <Route path="/" component={Home}/>
            <Route path="/CreateClient" component={CreateClient}/>
            <Route path="/ReadClient" component={ReadClient}/>
            </switch>
          </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h1>Home Page</h1>
    </div>
);

export default App;