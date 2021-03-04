import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import CreateClient from './components/clients/CreateClient';
import ReadClient from './components/clients/ReadClient';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
          <div className="App">
            <Navbar />
            <Route patch="/" component={Home}/>
            <Route patch="/CreateClient" component={CreateClient}/>
            <Route patch="/ReadClient" component={ReadClient}/>
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