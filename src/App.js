import React from "react";
import "./App.css";
import SideMenu from "./components/navigation/sideMenu/SideMenu";
import { InitializeUserContext } from "./shared/context/userContext";

import CreateClient from "./components/Clients/CreateClient";
import ReadClient from "./components/Clients/ReadClient";
import UpdateClient from "./components/Clients/UpdateClient";
import ListClient from "./components/Clients/ListClient";

import CreateRdv from "./components/Planning/CreateRdv";
import ReadRdv from "./components/Planning/ReadRdv";
import UpdateRdv from "./components/Planning/UpdateRdv";

import CreateProperty from "./components/Properties/CreateProperty";
import ReadProperty from "./components/Properties/ReadProperty";
import UpdateProperty from "./components/Properties/UpdateProperty";
import PropertyList from "./components/Properties/ListProperties";

import CreateUser from "./components/Users/CreateUser";
import ReadUser from "./components/Users/ReadUser";
import UpdateUser from "./components/Users/UpdateUser";

import LoginPage from "./components/login/Login";

import DashboardPage from "./components/dashboard/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './shared/middleware/PrivateRoute';


function App() {
    return (
      <div className="App grid grid-cols-9 bg-gray-700">
        <Router>
            <InitializeUserContext>
            <PrivateRoute> 
            <div className="divSideMenu">
              <SideMenu />
            </div>
            </PrivateRoute>
            <div className="divContentArea col-start-2 col-span-9">
              <Switch>

                <Route path="/login" exact component={LoginPage} />
                <PrivateRoute path="/dashboard">
                  <DashboardPage />
                </PrivateRoute>

                <PrivateRoute path="/createClient">
                  <CreateClient />
                </PrivateRoute>
                <PrivateRoute path="/updateClient/:id">
                  <UpdateClient />
                </PrivateRoute>
                <PrivateRoute path="/readClient/:id">
                  <ReadClient />
                </PrivateRoute>
                <PrivateRoute path="/listeClient">
                  <ListClient />
                </PrivateRoute>

                <PrivateRoute path="/createRdv">
                  <CreateRdv />
                </PrivateRoute>
                <PrivateRoute path="/updateRdv/:id">
                  <UpdateRdv />
                </PrivateRoute>
                <PrivateRoute path="/readRdv/:id">
                  <ReadRdv />
                </PrivateRoute>

                <PrivateRoute path="/createProperty">
                  <CreateProperty />
                </PrivateRoute>
                <PrivateRoute path="/updateProperty/:id">
                  <UpdateProperty />
                </PrivateRoute>
                <PrivateRoute path="/readProperty/:id">
                  <ReadProperty />
                </PrivateRoute>
                <PrivateRoute path="/listProperty">
                  <PropertyList />
                </PrivateRoute>
  
                <PrivateRoute path="/createUser">
                  <CreateUser />
                </PrivateRoute>
                <PrivateRoute path="/updateUser/:id">
                  <UpdateUser />
                </PrivateRoute>
                <PrivateRoute path="/readUser/:id">
                  <ReadUser />
                </PrivateRoute>
                <PrivateRoute path="/listUser">
                  <CreateProperty />
                </PrivateRoute>

              </Switch>
            </div>
            </InitializeUserContext>
        </Router>
      </div>
    );
}

export default App;
