import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';

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

import login from './components/login/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {
    return ( <
        Router >
        <
        Navbar / >
        <
        div className = "App" >
        <
        Switch >

        <
        Route path = "/"
        exact component = {
            Home
        }
        />

        <
        Route path = "/CreateClient"
        component = {
            CreateClient
        }
        /> <
        Route path = "/UpdateClient"
        component = {
            UpdateClient
        }
        /> <
        Route path = "/ReadClient"
        component = {
            ReadClient
        }
        />


        <
        Route path = "/CreateRdv"
        component = {
            CreateRdv
        }
        /> <
        Route path = "/UpdateRdv"
        component = {
            UpdateRdv
        }
        /> <
        Route path = "/ReadRdv"
        component = {
            ReadRdv
        }
        />


        <
        Route path = "/CreateProperty"
        component = {
            CreateProperty
        }
        /> <
        Route path = "/UpdateProperty"
        component = {
            UpdateProperty
        }
        /> <
        Route path = "/ReadProperty"
        component = {
            ReadProperty
        }
        />


        <
        Route path = "/CreateUser"
        component = {
            CreateUser
        }
        /> <
        Route path = "/UpdateUser"
        component = {
            UpdateUser
        }
        /> <
        Route path = "/ReadUser"
        component = {
            ReadUser
        }
        />


        <
        Route path = "/login"
        component = {
            login
        }
        />

        <
        /Switch> < /
        div > <
        /Router>
    );
}

function Home() {
    return ( <
        div >
        <
        h1 > Home Page < /h1> < /
        div >
    );
}

export default App;