import React from 'react';
import './App.css';
// import Navbar from './components/navigation/Navbar';

import CreateClient from './components/clients/CreateClient';
import ReadClient from './components/clients/ReadClient';
import UpdateClient from './components/clients/UpdateClient';
import DeleteClient from './components/clients/DeleteClient';

import CreateRdv from './components/planning/CreateRdv';
import ReadRdv from './components/planning/ReadRdv';
import UpdateRdv from './components/planning/UpdateRdv';
import DeleteRdv from './components/planning/DeleteRdv';

import CreateProperty from './components/properties/CreateProperty';
import ReadProperty from './components/properties/ReadProperty';
import UpdateProperty from './components/properties/UpdateProperty';
import DeleteProperty from './components/properties/DeleteProperty';

import CreateUser from './components/users/CreateUser';
import ReadUser from './components/users/ReadUser';
import UpdateUser from './components/users/UpdateUser';
import DeleteUser from './components/users/DeleteUser';

import Login from './components/login/Login';
import SideMenu from './components/sideMenu/SideMenu';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <SideMenu />
                <switch>
                <Route path="/CreateClient" component={CreateClient}/>
                <Route path="/UpdateClient" component={UpdateClient}/>
                <Route path="/ReadClient" component={ReadClient}/>
                <Route path="/DeleteClient" component={DeleteClient}/>
                
                <Route path="/CreateRdv" component={CreateRdv}/>
                <Route path="/UpdateRdv" component={UpdateRdv}/>
                <Route path="/ReadRdv" component={ReadRdv}/>
                <Route path="/DeleteRdv" component={DeleteRdv}/>
                
                <Route path="/CreateProperty" component={CreateProperty}/>
                <Route path="/UpdateProperty" component={UpdateProperty}/>
                <Route path="/ReadProperty" component={ReadProperty}/>
                <Route path="/DeleteProperty" component={DeleteProperty}/>
                
                <Route path="/CreateUser" component={CreateUser}/>
                <Route path="/UpdateUser" component={UpdateUser}/>
                <Route path="/ReadUser" component={ReadUser}/>
                <Route path="/DeleteUser" component={DeleteUser}/>
                
                <Route path="/login" component={Login}/>
            
                </switch>
            </div>
        </Router>
    );
}

export default App;