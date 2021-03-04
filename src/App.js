import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import CreateClient from './components/Clients/CreateClient';
import ReadClient from './components/Clients/ReadClient';
import 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Nav />
            <CreateClient />
            <ReadClient />
        </div>
    );
}