import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';

import CreateClient from './components/Clients/CreateClient';
import ReadClient from './components/Clients/ReadClient';
import UpdateClient from './components/Clients/UpdateClient';
import DeleteClient from './components/Clients/DeleteClient';

import CreateRdv from './components/Planning/CreateRdv';
import ReadRdv from './components/Planning/ReadRdv';
import UpdateRdv from './components/Planning/UpdateRdv';
import DeleteRdv from './components/Planning/DeleteRdv';

import CreateProperty from './components/Properties/CreateProperty';
import ReadProperty from './components/Properties/ReadProperty';
import UpdateProperty from './components/Properties/UpdateProperty';
import DeleteProperty from './components/Properties/DeleteProperty';

import CreateUser from './components/Users/CreateUser';
import ReadUser from './components/Users/ReadUser';
import UpdateUser from './components/Users/UpdateUser';
import DeleteUser from './components/Users/DeleteUser';

import login from './components/login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navbar />
          <div className="App">
            <switch>

            <Route path="/" exact component={Home}/>

            <Route path="/CreateClient" component={CreateClient}/>
            <Route path="/UpdateClient" component={UpdateClient}/>
            <Route path="/ReadClient" component={ReadClient}/>
            

            <Route path="/CreateRdv" component={CreateRdv}/>
            <Route path="/UpdateRdv" component={UpdateRdv}/>
            <Route path="/ReadRdv" component={ReadRdv}/>
            

            <Route path="/CreateProperty" component={CreateProperty}/>
            <Route path="/UpdateProperty" component={UpdateProperty}/>
            <Route path="/ReadProperty" component={ReadProperty}/>
            

            <Route path="/CreateUser" component={CreateUser}/>
            <Route path="/UpdateUser" component={UpdateUser}/>
            <Route path="/ReadUser" component={ReadUser}/>
            

            <Route path="/login" component={login}/>

            </switch>
          </div>
        </Router>
    );
}
function Home() {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

export default App;